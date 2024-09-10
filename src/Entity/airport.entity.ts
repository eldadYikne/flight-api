import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FlightEntity } from './flight.entity';

@Entity('airports')
export class AirportEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  airportName: string;
  @Column()
  airportCity: string;
  @Column()
  airportCountry: string;

  @OneToMany(() => FlightEntity, (flight) => flight.takeoffAirport)
  takeoffFlights: FlightEntity[];

  @OneToMany(() => FlightEntity, (flight) => flight.landingAirport)
  landingFlights: FlightEntity[];
}
