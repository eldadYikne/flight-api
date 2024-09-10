import { Module } from '@nestjs/common';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightEntity } from 'src/Entity/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {} from 'src/airport/airport.module';
import { AirportEntity } from 'src/Entity/airport.entity';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([FlightEntity, AirportEntity])],
  controllers: [FlightController],
  providers: [FlightService, SocketGateway],
})
export class FlightModule {}
