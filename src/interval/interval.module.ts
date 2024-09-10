import { Module } from '@nestjs/common';
import { FlightService } from 'src/flight/flight.service';
import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  //   providers: [FlightService, SocketGateway],
  imports: [],
})
export class IntervalModule {}
