import { PrismaTasksRepository } from "../../repositories/prisma/prisma-tasks-repository";
import { CreateTaskUseCase } from "../CreateTask";
import { GetTasksUseCase } from "../GetTasks";
import { GetTaskUseCase } from "../GetTask";
import { UpdateTaskUseCase } from "../UpdateTask";
import { DeleteTaskUseCase } from "../DeleteTask";

const tasksRepository = new PrismaTasksRepository();

export function makeCreateTaskUseCase() {
    return new CreateTaskUseCase(tasksRepository);
}

export function makeGetTasksUseCase() {
    return new GetTasksUseCase(tasksRepository);
}

export function makeGetTaskUseCase() {
    return new GetTaskUseCase(tasksRepository);
}

export function makeUpdateTaskUseCase() {
    return new UpdateTaskUseCase(tasksRepository);
}

export function makeDeleteTaskUseCase() {
    return new DeleteTaskUseCase(tasksRepository);
}
