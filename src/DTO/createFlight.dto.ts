import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { FlightStatus } from 'src/Entity/flight.entity';

export class CreateFlightDto {
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{3,12}$/, {
    message:
      'flightNumber must be 6 to 12 characters long, containing only uppercase letters and numbers',
  })
  flightNumber: string;

  @IsNotEmpty()
  landingAirportId: number;
  @IsNotEmpty()
  takeoffAirportId: number;

  landingdilayTime: string;
  takeoffdilayTime: string;

  @IsNotEmpty()
  takeoffTime: string;
  @IsNotEmpty()
  landingTime: string;
}
