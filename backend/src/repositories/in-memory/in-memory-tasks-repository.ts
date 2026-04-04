import { Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { TasksRepository, FindAllOptions } from '../tasks-repository';

export class InMemoryTasksRepository implements TasksRepository {
    public items: any[] = [];

    async create(data: Prisma.TaskCreateInput): Promise<any> {
        const task = {
            id: randomUUID(),
            title: data.title,
            description: (data.description as string) || null,
            completed: data.completed || false,
            createdAt: new Date(),
            categoryId: (data.category?.connect?.id || 1) as number,
        };
        this.items.push(task);
        return task;
    }

    async findAll(options?: FindAllOptions): Promise<any[]> {
        return this.items;
    }

    async findById(id: number): Promise<any | null> {
        const task = this.items.find((task) => task.id === id);
        return task || null;
    }

    async update(id: string, data: Prisma.TaskUpdateInput): Promise<any> {
        const taskIndex = this.items.findIndex((task) => task.id === id);   
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }
        const existingTask = this.items[taskIndex];
        const updatedTask = {
            ...existingTask,
            title: (data.title as string) || existingTask.title,
            description: (data.description as (string | null)) || existingTask.description,
            completed: (data.completed as boolean) || existingTask.completed,
        };
        this.items[taskIndex] = updatedTask;
        return updatedTask;
    }

    async delete(id: string): Promise<void> {
        const taskIndex = this.items.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            throw new Error('Task not found');
        }
        this.items.splice(taskIndex, 1);
    }
}
