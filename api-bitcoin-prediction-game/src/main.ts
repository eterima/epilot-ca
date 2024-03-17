import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/config.types';
import { validationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService<AppConfig>);
  await mongoose.connect(
    `mongodb+srv://${configService.get(
      'MONGO_DB_USERNAME',
    )}:${configService.get(
      'MONGO_DB_PASSWORD',
    )}@boilerplate.cgtrhem.mongodb.net/boilerplate?retryWrites=true&w=majority`,
  );

  app.useGlobalPipes(validationPipe);

  await app.listen(3500);
}
bootstrap();
