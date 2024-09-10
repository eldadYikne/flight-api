import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFlightDto } from 'src/DTO/createFlight.dto';
import { AirportEntity } from 'src/Entity/airport.entity';
import { FlightEntity, FlightStatus } from 'src/Entity/flight.entity';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Repository } from 'typeorm';

export interface FlightsResponse {
  id: number;
  flightNumber: string;
  status: FlightStatus;
  takeoffAirport: string; // airportName
  landingAirport: string; // airportName
  takeoffTime: string;
  landingTime: string;
}
@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(AirportEntity)
    private repoAirport: Repository<AirportEntity>,
    @InjectRepository(FlightEntity)
    private repoFlights: Repository<FlightEntity>,
    private sockect: SocketGateway,
  ) {}
  async getAllFlights(
    flightNumber?: string,
    takeoffAirportId?: number,
    landingAirportId?: number,
    flightId?: string,
  ): Promise<FlightsResponse[]> {
    const queryBuilder = this.repoFlights
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.takeoffAirport', 'takeoffAirport')
      .leftJoinAndSelect('flight.landingAirport', 'landingAirport');

    if (flightNumber) {
      queryBuilder.andWhere('flight.flightNumber = :flightNumber', {
        flightNumber,
      });
    }
    if (flightId) {
      queryBuilder.andWhere('flight.id = :flightId', {
        flightId,
      });
    }
    if (takeoffAirportId) {
      queryBuilder.andWhere('flight.takeoffAirportId = :takeoffAirportId', {
        takeoffAirportId,
      });
    }
    if (landingAirportId) {
      queryBuilder.andWhere('flight.landingAirportId = :landingAirportId', {
        landingAirportId,
      });
    }

    const flights = await queryBuilder.getMany();

    return flights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      status: flight.status,
      takeoffAirport: flightId
        ? String(flight.takeoffAirport.id)
        : flight.takeoffAirport?.airportName,
      landingAirport: flightId
        ? String(flight.landingAirport.id)
        : flight.landingAirport?.airportName,
      takeoffTime: flight.takeoffTime,
      landingTime: flight.landingTime,
      landingdilayTime: flight.landingdilayTime,
      takeoffdilayTime: flight.takeoffdilayTime,
    }));
  }

  async createFlight(createFlightDto: CreateFlightDto): Promise<FlightEntity> {
    try {
      const newFlight: FlightEntity = new FlightEntity();
      const {
        flightNumber,
        landingTime,
        landingAirportId,
        takeoffAirportId,
        takeoffTime,
      } = createFlightDto;
      console.log('createFlightDto', createFlightDto);
      const landingAirportFromDb = await this.repoAirport.findOne({
        where: { id: landingAirportId },
      });
      if (!landingAirportFromDb) {
        throw new InternalServerErrorException(` not found landingAirport  `);
      }
      const takeoffAirportFromDb = await this.repoAirport.findOne({
        where: { id: takeoffAirportId },
      });
      if (!takeoffAirportFromDb) {
        throw new InternalServerErrorException(` not found takeoffAirport  `);
      }
      newFlight.landingAirportId = landingAirportId;
      newFlight.takeoffAirportId = takeoffAirportId;
      newFlight.takeoffTime = takeoffTime;
      newFlight.flightNumber = flightNumber;
      newFlight.landingTime = landingTime;
      newFlight.status = FlightStatus.HANGER;

      this.repoFlights.create(newFlight);
      console.log('new Flight created!', newFlight.flightNumber);
      this.sockect.emitFlights({ id: '1' });
      return await this.repoFlights.save(newFlight);
    } catch (err) {
      console.log('Cant upadte flight', err);
      throw new InternalServerErrorException(`Cant create flight `);
    }
  }

  async updateFlight(id: number, flight: FlightEntity) {
    try {
      await this.repoFlights.update(id, flight);
      let updatedFlight = await this.repoFlights.findOne({ where: { id: id } });
      if (!updatedFlight) {
        throw new InternalServerErrorException(`Cant update unknow flight `);
      }
      console.log('updatedFlight', id, flight);
      console.log('updatedFlight', updatedFlight);
      this.sockect.emitFlights({ id: '1' });

      return updatedFlight;
    } catch (err) {
      console.log('Cant upadte flight', err);
      throw new InternalServerErrorException(`Cant update flight `);
    }
  }
  async deleteFlight(id) {
    try {
      console.log(`Try delete flight id- ${id}`);
      this.sockect.emitFlights({ id: '1' });
      return await this.repoFlights.delete({ id });
    } catch (err) {
      throw new InternalServerErrorException(`${id} canot found and deleted `);
    }
  }

  async updateRandomFlight(): Promise<FlightEntity | null> {
    try {
      const flights = await this.repoFlights.find();

      if (flights.length === 0) {
        console.log('No flights available to update.');
        return null;
      }

      const randomIndex = Math.floor(Math.random() * flights.length);
      const flightToUpdate = flights[randomIndex];

      const shouldUpdateStatus = Math.random() < 0.8;

      if (shouldUpdateStatus) {
        flightToUpdate.status =
          flightToUpdate.status === FlightStatus.MALFUNCTION
            ? FlightStatus.HANGER
            : flightToUpdate.status !== FlightStatus.HANGER
              ? FlightStatus.MALFUNCTION
              : FlightStatus.AIRBORNE;
        console.log(`Updated flight status to ${flightToUpdate.status}`);
      } else {
        const delayMinutes = Math.floor(Math.random() * 121);
        if (Math.random() < 0.5) {
          flightToUpdate.takeoffdilayTime = this.addMinutesToTime(
            flightToUpdate.takeoffTime,
            delayMinutes,
          );
        } else {
          flightToUpdate.landingdilayTime = this.addMinutesToTime(
            flightToUpdate.landingTime,
            delayMinutes,
          );
        }
      }

      // Save the updated flight
      await this.repoFlights.save(flightToUpdate);

      // Emit event to inform clients about the update
      this.sockect.emitFlights({ id: flightToUpdate.id });

      return flightToUpdate;
    } catch (err) {
      console.error('Error updating random flight:', err);
      throw new InternalServerErrorException('Error updating random flight');
    }
  }
  private addMinutesToTime(time: string, minutes: number): string {
    const [hours, minutesStr] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutesStr + minutes; // Total minutes
    const newHours = Math.floor(totalMinutes / 60) % 24; // Wrap around to 24-hour format
    const newMinutes = totalMinutes % 60;

    // Format back to HH:mm
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }

  private intervalId: NodeJS.Timeout;
  startInterval() {
    this.intervalId = setInterval(() => {
      this.updateRandomFlight();
      //   console.log('interval ');
    }, 300); // Executes every 1 second (1000 milliseconds)
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
