import { Prisma } from '@prisma/client';
import { TasksRepository } from '../repositories/tasks-repository';

interface CreateTaskUseCaseRequest {
    title: string;
    description?: string;
    completed?: boolean;
    createdAt?: Date;
    categoryId: number;
}

interface CreateTaskUseCaseResponse {
    task: any;
}

export class CreateTaskUseCase {
    constructor(private taskRepository: TasksRepository) {}

    async execute({
        title,
        description,
        completed = false,
        createdAt = new Date(),
        categoryId,
    }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
        const task = await this.taskRepository.create({
            title,
            description: description || undefined,
            completed,
            createdAt,
            category: { connect: { id: categoryId } },
        } as Prisma.TaskCreateInput);

        return {
            task,
        };
    }
}