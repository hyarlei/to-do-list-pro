import { Prisma } from '@prisma/client'
import prisma from '../../lib/prisma'
import { TasksRepository } from '../tasks-repository'

export class PrismaTasksRepository implements TasksRepository {
    async create(data: Prisma.TaskCreateInput) {
        const task = await prisma.task.create({
            data,
        })
        return task
    }

    async findAll() {
        const tasks = await prisma.task.findMany()
        return tasks
    }

    async update(id: number, data: Prisma.TaskUpdateInput) {
        const task = await prisma.task.update({
            where: { id },
            data,
        })
        return task
    }

    async delete(id: number) {
        await prisma.task.delete({
            where: { id },
        })
    }

}