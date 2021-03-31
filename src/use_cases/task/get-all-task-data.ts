import { TaskEntity } from '../../domain/database/entities';
import { TaskRepository } from '../../domain/repository';

export class GetAllTaskData {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(): Promise<TaskEntity[]> {
    return this.taskRepository.findAll();
  }
}
