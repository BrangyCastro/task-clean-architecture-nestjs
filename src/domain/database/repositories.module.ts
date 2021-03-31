import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm-config.module';

import { DatabaseTaskRepository } from './database_task.repository';
import { TaskEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    TypeOrmConfigModule,
    EnvironmentConfigModule,
  ],
  providers: [DatabaseTaskRepository],
  exports: [DatabaseTaskRepository],
})
export class RepositoriesModule {}
