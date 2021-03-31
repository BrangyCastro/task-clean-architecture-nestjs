import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProxyServicesDynamicModule } from '../use_cases_proxy/proxy-services-dynamic.module';
import { TaskController } from './controller';
import { InvalidTaskErrorFilter } from './filters/invalid-dummy-error.filter';

@Module({
  imports: [ProxyServicesDynamicModule.register()],
  controllers: [TaskController],
  providers: [{ provide: APP_FILTER, useClass: InvalidTaskErrorFilter }],
})
export class RestModule {}
