import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskEntity } from '../../../domain/database/entities';
import { ProxyServicesDynamicModule } from '../../use_cases_proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../../use_cases_proxy/use-case-proxy';
import { GetAllTaskData, CreateTaskData } from '../../../use_cases';
import { TaskDto } from '../../../domain/repository/task/dto/task.dto';

@Controller('/task')
export class TaskController {
  constructor(
    @Inject(ProxyServicesDynamicModule.GET_ALL_TASK_DATA_PROXY_SERVICE)
    private readonly getAllDummyDataProxyService: UseCaseProxy<GetAllTaskData>,
    @Inject(ProxyServicesDynamicModule.CREATE_TASK_DATA_PROXY_SERVICE)
    private readonly createDummyDataProxyService: UseCaseProxy<CreateTaskData>,
  ) {}

  @Get('/')
  async getAllTaskData(): Promise<TaskEntity[]> {
    return this.getAllDummyDataProxyService.getInstance().execute();
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async postTaskData(@Body() taskDto: TaskDto): Promise<TaskEntity> {
    return this.createDummyDataProxyService.getInstance().execute(taskDto);
  }
}
