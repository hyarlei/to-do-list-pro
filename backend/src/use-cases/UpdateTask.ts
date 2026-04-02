import { TasksRepository } from '../repositories/tasks-repository';
import { Prisma } from '@prisma/client';

interface UpdateTaskUseCaseRequest {
  id: number;
  data: Prisma.TaskUpdateInput;
}

interface UpdateTaskUseCaseResponse {
  task: any;
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({ id, data }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.taskRepository.update(id, data);

    return {
      task,
    };
  }
}
