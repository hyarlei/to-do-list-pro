import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { CreateTaskUseCase } from "../Task";

export function makeCreateTaskUseCase() {
    const tasksRepository = new PrismaTasksRepository();
    const useCase = new CreateTaskUseCase(tasksRepository);
    return useCase;
}