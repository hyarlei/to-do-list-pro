import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { CreateTaskUseCase } from '../../use-cases/Task';

class TaskController {
  private createTaskUseCase: CreateTaskUseCase;

  constructor() {
    this.createTaskUseCase = new CreateTaskUseCase({
      create: (data: any) => prisma.task.create({ data: data as any }),
    } as any);
  }

  async store(req: Request, res: Response): Promise<Response> {
    try {
      const response = await this.createTaskUseCase.execute(req.body);
      return res.status(201).json(response.task);
    } catch (error: any) {
      console.error('Erro ao criar tarefa:', error);
      return res.status(400).json({ 
        error: 'Erro ao criar tarefa',
        details: error.message || error
      });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const { completed } = req.query;
      const where: any = {};
      
      if (completed === 'true' || completed === 'false') {
        where.completed = completed === 'true';
      }

      const tasks = await prisma.task.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      });
      return res.json(tasks);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar tarefas' });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
        include: { category: true },
      });
      
      if (!task) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      
      return res.json(task);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao buscar tarefa' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const task = await prisma.task.update({
        where: { id: Number(id) },
        data: req.body,
        include: { category: true },
      });
      return res.json(task);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar tarefa' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao deletar tarefa' });
    }
  }
}

export default new TaskController();