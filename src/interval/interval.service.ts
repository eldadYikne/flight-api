import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { FlightService } from 'src/flight/flight.service';
@Injectable()
export class IntervalService {
  private readonly logger = new Logger(IntervalService.name);
  private flightService: FlightService;
  private intervalId: NodeJS.Timeout;
  startInterval() {
    this.intervalId = setInterval(() => {
      //   this.flightService.updateRandomFlight();
      //   console.log('interval ');
    }, 300); // Executes every 1 second (1000 milliseconds)
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.logger.log('Interval cleared');
    }
  }
}
