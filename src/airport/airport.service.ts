import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAirportDto } from 'src/DTO/createAirport.dto';
import { AirportEntity } from 'src/Entity/airport.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(AirportEntity) private repo: Repository<AirportEntity>,
  ) {}

  async getAllAirports(): Promise<AirportEntity[]> {
    return await this.repo.find();
  }
  async insertDefaultAirports() {
    console.log('insertAllAirports');
    airports.forEach(async (airport) => {
      return await this.createAirport(airport);
    });
  }

  async createAirport(
    createAirportDto: CreateAirportDto,
  ): Promise<AirportEntity> {
    const newAirport: AirportEntity = new AirportEntity();
    const { airportCity, airportCountry, airportName } = createAirportDto;

    newAirport.airportCity = airportCity;
    newAirport.airportCountry = airportCountry;
    newAirport.airportName = airportName;

    this.repo.create(newAirport);
    console.log('new Airport created!', newAirport);
    return await this.repo.save(newAirport);
  }
}

export const airports = [
  {
    airportName: 'Hartsfield-Jackson Atlanta',
    airportCity: 'Atlanta',
    airportCountry: 'USA',
  },
  {
    airportName: 'Beijing Capital',
    airportCity: 'Beijing',
    airportCountry: 'CHN',
  },
  {
    airportName: 'Los Angeles',
    airportCity: 'Los Angeles',
    airportCountry: 'USA',
  },
  { airportName: 'Tokyo Haneda', airportCity: 'Tokyo', airportCountry: 'JPN' },
  { airportName: 'Dubai', airportCity: 'Dubai', airportCountry: 'UAE' },
  { airportName: "O'Hare", airportCity: 'Chicago', airportCountry: 'USA' },
  { airportName: 'Heathrow', airportCity: 'London', airportCountry: 'UK' },
  { airportName: 'Hong Kong', airportCity: 'Hong Kong', airportCountry: 'CHN' },
  {
    airportName: 'Shanghai Pudong',
    airportCity: 'Shanghai',
    airportCountry: 'CHN',
  },
  {
    airportName: 'Charles de Gaulle',
    airportCity: 'Paris',
    airportCountry: 'FRA',
  },
  {
    airportName: 'Dallas/Fort Worth',
    airportCity: 'Dallas',
    airportCountry: 'USA',
  },
  {
    airportName: 'Guangzhou Baiyun',
    airportCity: 'Guangzhou',
    airportCountry: 'CHN',
  },
  {
    airportName: 'Amsterdam Schiphol',
    airportCity: 'Amsterdam',
    airportCountry: 'NLD',
  },
  { airportName: 'Frankfurt', airportCity: 'Frankfurt', airportCountry: 'GER' },
  { airportName: 'Istanbul', airportCity: 'Istanbul', airportCountry: 'TUR' },
  {
    airportName: 'Singapore Changi',
    airportCity: 'Singapore',
    airportCountry: 'SGP',
  },
  { airportName: 'Incheon', airportCity: 'Seoul', airportCountry: 'KOR' },
  { airportName: 'Denver', airportCity: 'Denver', airportCountry: 'USA' },
  {
    airportName: 'Suvarnabhumi',
    airportCity: 'Bangkok',
    airportCountry: 'THA',
  },
  {
    airportName: 'Madrid Barajas',
    airportCity: 'Madrid',
    airportCountry: 'ESP',
  },
  {
    airportName: 'Sydney Kingsford Smith',
    airportCity: 'Sydney',
    airportCountry: 'AUS',
  },
  { airportName: 'Ben Gurion', airportCity: 'Lod', airportCountry: 'ISR' },
  { airportName: 'Miami', airportCity: 'Miami', airportCountry: 'USA' },
  {
    airportName: 'Toronto Pearson',
    airportCity: 'Toronto',
    airportCountry: 'CAN',
  },
  {
    airportName: 'São Paulo-Guarulhos',
    airportCity: 'São Paulo',
    airportCountry: 'BRA',
  },
  {
    airportName: 'Mexico City',
    airportCity: 'Mexico City',
    airportCountry: 'MEX',
  },
  {
    airportName: 'Las Vegas McCarran',
    airportCity: 'Las Vegas',
    airportCountry: 'USA',
  },
  { airportName: 'Munich', airportCity: 'Munich', airportCountry: 'GER' },
  { airportName: 'Boston Logan', airportCity: 'Boston', airportCountry: 'USA' },
  {
    airportName: 'Barcelona El Prat',
    airportCity: 'Barcelona',
    airportCountry: 'ESP',
  },
  { airportName: 'Gatwick', airportCity: 'London', airportCountry: 'UK' },
  { airportName: 'Orlando', airportCity: 'Orlando', airportCountry: 'USA' },
  {
    airportName: 'Chengdu Shuangliu',
    airportCity: 'Chengdu',
    airportCountry: 'CHN',
  },
  {
    airportName: 'Jakarta Soekarno-Hatta',
    airportCity: 'Jakarta',
    airportCountry: 'IDN',
  },
  {
    airportName: 'Moscow Sheremetyevo',
    airportCity: 'Moscow',
    airportCountry: 'RUS',
  },
  { airportName: 'Rome Fiumicino', airportCity: 'Rome', airportCountry: 'ITA' },
  {
    airportName: 'Kuala Lumpur',
    airportCity: 'Kuala Lumpur',
    airportCountry: 'MYS',
  },
  {
    airportName: 'Chongqing Jiangbei',
    airportCity: 'Chongqing',
    airportCountry: 'CHN',
  },
  {
    airportName: 'Newark Liberty',
    airportCity: 'Newark',
    airportCountry: 'USA',
  },
  { airportName: 'Melbourne', airportCity: 'Melbourne', airportCountry: 'AUS' },
  { airportName: 'Brisbane', airportCity: 'Brisbane', airportCountry: 'AUS' },
  {
    airportName: 'Washington Dulles',
    airportCity: 'Washington',
    airportCountry: 'USA',
  },
  {
    airportName: 'São Paulo Congonhas',
    airportCity: 'São Paulo',
    airportCountry: 'BRA',
  },
  {
    airportName: 'Buenos Aires Ezeiza',
    airportCity: 'Buenos Aires',
    airportCountry: 'ARG',
  },
  {
    airportName: 'Rio de Janeiro Galeão',
    airportCity: 'Rio de Janeiro',
    airportCountry: 'BRA',
  },
  {
    airportName: 'Vienna Schwechat',
    airportCity: 'Vienna',
    airportCountry: 'AUT',
  },
  { airportName: 'Zurich', airportCity: 'Zurich', airportCountry: 'CHE' },
  {
    airportName: 'Copenhagen',
    airportCity: 'Copenhagen',
    airportCountry: 'DNK',
  },
  {
    airportName: 'Lisbon Portela',
    airportCity: 'Lisbon',
    airportCountry: 'PRT',
  },
];
