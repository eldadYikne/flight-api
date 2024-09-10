import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('APIAPI', process.env.API_URL);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:4200',
    // origin: process.env.API_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
