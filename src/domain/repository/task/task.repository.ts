import { TaskEntity } from '../../database/entities';
import { TaskDto } from './dto/task.dto';

export interface TaskRepository {
  save(taskDto: TaskDto): Promise<TaskEntity>;
  findAll(): Promise<TaskEntity[]>;
}
