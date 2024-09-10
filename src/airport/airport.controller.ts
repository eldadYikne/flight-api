import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from 'src/DTO/createAirport.dto';

@Controller('airports')
export class AirportController {
  constructor(private airportService: AirportService) {}

  @Get('')
  getAllAirports() {
    console.log('airpost:', this.airportService.getAllAirports());
    return this.airportService.getAllAirports();
  }
  @Post('')
  createNewAirport(@Body(ValidationPipe) data: CreateAirportDto) {
    return this.airportService.createAirport(data);
  }
  @Post('insert')
  insertsAirports() {
    console.log('insert airport');
    return this.airportService.insertDefaultAirports();
  }
}
