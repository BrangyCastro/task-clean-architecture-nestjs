import { TaskDto } from '../../domain/repository/task/dto/task.dto';
import { TaskRepository } from '../../domain/repository';
import { TaskEntity } from '../../domain/database/entities';

export class CreateTaskData {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(taskDto: TaskDto): Promise<TaskEntity> {
    return this.taskRepository.save(taskDto);
  }
}
