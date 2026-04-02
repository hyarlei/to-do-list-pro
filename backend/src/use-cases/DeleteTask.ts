import { TasksRepository } from '../repositories/tasks-repository';

interface DeleteTaskUseCaseRequest {
  id: number;
}

interface DeleteTaskUseCaseResponse {
  success: boolean;
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute({ id }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    await this.taskRepository.delete(id);

    return {
      success: true,
    };
  }
}
