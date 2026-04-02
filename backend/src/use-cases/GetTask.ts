import { TasksRepository } from '../repositories/tasks-repository';

interface GetTaskUseCaseRequest {
  id: number;
}

interface GetTaskUseCaseResponse {
  task: any;
}

export class GetTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({ id }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new Error('Task not found');
    }

    return {
      task,
    };
  }
}
