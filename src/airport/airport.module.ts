import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportEntity } from 'src/Entity/airport.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportController } from './airport.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AirportEntity])],
  controllers: [AirportController],
  providers: [AirportService],
})
export class AirportModule {}
