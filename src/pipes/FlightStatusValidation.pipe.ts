import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { FlightStatus } from 'src/Entity/flight.entity';

export class FlightStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    FlightStatus.AIRBORNE,
    FlightStatus.HANGER,
    FlightStatus.MALFUNCTION,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    if (value) {
      let newValue = String(value).toUpperCase();
      if (!this.IsStatusValid(newValue)) {
        throw new BadRequestException(`${newValue} is invalid status flight.`);
      }

      return newValue;
    } else {
      throw new BadRequestException(`${value} is invalid status flight.`);
    }
  }

  private IsStatusValid(status) {
    return !!this.allowedStatus.find((st) => status === st);
  }
}
