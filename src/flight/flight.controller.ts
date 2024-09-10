import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from 'src/DTO/createFlight.dto';
import { FlightEntity, FlightStatus } from 'src/Entity/flight.entity';
import { FlightStatusValidationPipe } from 'src/pipes/FlightStatusValidation.pipe';

@Controller('flights')
export class FlightController {
  constructor(private FlightService: FlightService) {}
  @Get('')
  getAllFlights(
    @Query('flightNumber') flightNumber?: string,
    @Query('takeoffAirportId') takeoffAirportId?: number,
    @Query('landingAirportId') landingAirportId?: number,
    @Query('id') flightId?: string,
  ) {
    return this.FlightService.getAllFlights(
      flightNumber,
      takeoffAirportId,
      landingAirportId,
      flightId,
    );
  }

  @Post('')
  createNewFlight(@Body(ValidationPipe) data: CreateFlightDto) {
    console.log('new flight enter :', data);
    return this.FlightService.createFlight(data);
  }
  @Patch(':id')
  updateFlight(
    @Param() id: { id: number },
    @Body('flight') flight: FlightEntity,
  ) {
    console.log('id', id);
    console.log('flight to update', flight);
    return this.FlightService.updateFlight(id.id, flight);
  }
  @Delete(':id')
  deleteFlight(@Param() id: { id: number }) {
    console.log('id', id.id);
    return this.FlightService.deleteFlight(id.id);
  }

  onModuleInit() {
    this.FlightService.startInterval();
  }
  onModuleDestroy() {
    this.FlightService.stopInterval();
  }
}
