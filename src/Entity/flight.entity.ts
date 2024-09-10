import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AirportEntity } from './airport.entity';

@Entity('flights')
export class FlightEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  flightNumber: string;
  @Column()
  landingAirportId: number;
  @Column()
  takeoffAirportId: number;
  @Column()
  status: FlightStatus;
  @Column()
  takeoffTime: string;
  @Column()
  landingTime: string;
  @Column()
  landingdilayTime: string;
  @Column()
  takeoffdilayTime: string;
  @ManyToOne(() => AirportEntity, { eager: true }) // Automatically load related airport
  takeoffAirport: AirportEntity;

  @ManyToOne(() => AirportEntity, { eager: true }) // Automatically load related airport
  landingAirport: AirportEntity;
}

export enum FlightStatus {
  HANGER = 'HANGER',
  AIRBORNE = 'AIRBORNE',
  MALFUNCTION = 'MALFUNCTION',
}
