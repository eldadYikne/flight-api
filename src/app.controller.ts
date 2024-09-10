import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IntervalService } from './interval/interval.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly intervalService: IntervalService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
