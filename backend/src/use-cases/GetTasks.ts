import { TasksRepository } from '../repositories/tasks-repository';

interface GetTasksUseCaseRequest {
  completed?: boolean;
}

interface GetTasksUseCaseResponse {
  tasks: any[];
}

export class GetTasksUseCase {
  constructor(private taskRepository: TasksRepository) {}

  async execute(filters?: GetTasksUseCaseRequest): Promise<GetTasksUseCaseResponse> {
    const tasks = await this.taskRepository.findAll({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    
    let filteredTasks = tasks;
    if (filters?.completed !== undefined) {
      filteredTasks = tasks.filter(task => task.completed === filters.completed);
    }

    return {
      tasks: filteredTasks,
    };
  }
}
