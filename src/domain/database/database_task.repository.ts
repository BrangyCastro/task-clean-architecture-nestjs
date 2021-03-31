import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDto } from 'src/domain/repository/task/dto/task.dto';
import { Repository } from 'typeorm';
import { TaskRepository } from '../repository';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class DatabaseTaskRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly _taskEntityRepository: Repository<TaskEntity>,
  ) {}

  async save(taskDto: TaskDto): Promise<TaskEntity> {
    const taskEntity: TaskEntity = this.toTaskEntity(taskDto);
    const savedTaskEntity: TaskEntity = await this._taskEntityRepository.save(
      taskEntity,
    );
    return savedTaskEntity;
  }

  async findAll(): Promise<TaskEntity[]> {
    const foundDummyEntities: TaskEntity[] = await this._taskEntityRepository.find();
    return foundDummyEntities;
  }

  private toTaskEntity(taskDto: TaskDto): TaskEntity {
    const taskEntity: TaskEntity = new TaskEntity();

    taskEntity.title = taskDto.title;
    taskEntity.description = taskDto.description;
    taskEntity.status = taskDto.status;

    return taskEntity;
  }
}
