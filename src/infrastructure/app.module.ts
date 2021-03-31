import { Module } from '@nestjs/common';
import { RestModule } from './rest/rest.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RestModule, ConfigModule.forRoot()],
})
export class AppModule {}
