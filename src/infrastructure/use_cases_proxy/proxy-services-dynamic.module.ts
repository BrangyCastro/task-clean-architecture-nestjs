import { DynamicModule, Module } from '@nestjs/common';
import { DatabaseTaskRepository } from '../../domain/database/database_task.repository';
import { RepositoriesModule } from '../../domain/database/repositories.module';
import { GetAllTaskData, CreateTaskData } from '../../use_cases';

import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static GET_ALL_TASK_DATA_PROXY_SERVICE: string = 'GetAllTaskDataProxyService';
  static CREATE_TASK_DATA_PROXY_SERVICE: string = 'CreateTaskDataProxyService';

  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        //================== TASK =====================================
        {
          inject: [DatabaseTaskRepository],
          provide: ProxyServicesDynamicModule.GET_ALL_TASK_DATA_PROXY_SERVICE,
          useFactory: (databaseTaskRepository: DatabaseTaskRepository) =>
            new UseCaseProxy(new GetAllTaskData(databaseTaskRepository)),
        },
        {
          inject: [DatabaseTaskRepository],
          provide: ProxyServicesDynamicModule.CREATE_TASK_DATA_PROXY_SERVICE,
          useFactory: (databaseTaskRepository: DatabaseTaskRepository) =>
            new UseCaseProxy(new CreateTaskData(databaseTaskRepository)),
        },
      ],
      exports: [
        //================== TASK =====================================
        ProxyServicesDynamicModule.GET_ALL_TASK_DATA_PROXY_SERVICE,
        ProxyServicesDynamicModule.CREATE_TASK_DATA_PROXY_SERVICE,
      ],
    };
  }
}
