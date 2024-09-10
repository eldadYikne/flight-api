import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FlightModule } from './flight/flight.module';
import { AirportController } from './airport/airport.controller';
import { AirportModule } from './airport/airport.module';
import { SocketGateway } from './socket/socket.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { IntervalService } from './interval/interval.service';
import { FlightService } from './flight/flight.service';
const ormOptions: TypeOrmModuleOptions = {
  host: 'nestjsdb.cduq4k0kqzc0.eu-north-1.rds.amazonaws.com',
  type: 'mysql',
  port: 3306,
  username: 'admin',
  password: 'Nest123456',
  database: 'nestjsDB',
  autoLoadEntities: true,
  synchronize: false,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    FlightModule,
    AirportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway, IntervalService],
})
export class AppModule {}
