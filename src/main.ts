import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './infrastructure/app.module';
import { EnvironmentConfigService } from './domain/config/environment-config/environment-config.service';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port: string = app.get(EnvironmentConfigService).get('PORT');
  await app.listen(port);
  logger.log(`Aplicacion escuchando en el ${port}`);
}
bootstrap();
