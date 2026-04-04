import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { TasksRepository, FindAllOptions } from '../tasks-repository'

export class PrismaTasksRepository implements TasksRepository {
    async create(data: Prisma.TaskCreateInput) {
        const task = await prisma.task.create({
            data,
            include: { category: true },
        })
        return task
    }

    async findAll(options?: FindAllOptions) {
        const tasks = await prisma.task.findMany({
            include: options?.include || { category: true },
            orderBy: options?.orderBy || { createdAt: 'desc' },
        })
        return tasks
    }

    async findById(id: number) {
        const task = await prisma.task.findUnique({
            where: { id },
            include: { category: true },
        })
        return task
    }

    async update(id: number, data: Prisma.TaskUpdateInput) {
        const task = await prisma.task.update({
            where: { id },
            data,
            include: { category: true },
        })
        return task
    }

    async delete(id: number) {
        await prisma.task.delete({
            where: { id },
        })
    }

}