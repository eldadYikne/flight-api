import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAirportDto {
  @MaxLength(20, { message: 'Max length is 20 charts' })
  @IsNotEmpty()
  airportName: string;
  @IsNotEmpty()
  airportCity: string;
  @IsNotEmpty()
  airportCountry: string;
}
