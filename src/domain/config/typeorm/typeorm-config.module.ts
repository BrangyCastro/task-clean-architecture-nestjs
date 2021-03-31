import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TaskEntity } from '../../database/entities';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (
  environmentConfigService: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    type: environmentConfigService.get('DATABASE_TYPE'),
    host: environmentConfigService.get('DATABASE_HOST'),
    port: parseInt(environmentConfigService.get('DATABASE_PORT')),
    username: environmentConfigService.get('DATABASE_USERNAME'),
    password: environmentConfigService.get('DATABASE_PASSWORD'),
    database: environmentConfigService.get('DATABASE_NAME'),
    entities: [TaskEntity],
    synchronize: true,
    ssl: true,
  } as TypeOrmModuleOptions);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
