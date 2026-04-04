import { Request, Response } from 'express';
import {
  makeCreateTaskUseCase,
  makeGetTasksUseCase,
  makeGetTaskUseCase,
  makeUpdateTaskUseCase,
  makeDeleteTaskUseCase,
} from '../../use-cases/factores/make-create-task-use-case';

class TaskController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const createTaskUseCase = makeCreateTaskUseCase();
      const response = await createTaskUseCase.execute(req.body);
      return res.status(201).json(response.task);
    } catch (error: any) {
      console.error('Erro ao criar tarefa:', error);
      return res.status(400).json({
        error: 'Erro ao criar tarefa',
        details: error.message || error,
      });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const { completed } = req.query;
      const getTasksUseCase = makeGetTasksUseCase();

      const filters: any = {};
      if (completed === 'true' || completed === 'false') {
        filters.completed = completed === 'true';
      }

      const response = await getTasksUseCase.execute(filters);
      return res.json(response.tasks);
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      return res.status(400).json({ error: 'Erro ao listar tarefas' });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const getTaskUseCase = makeGetTaskUseCase();

      const response = await getTaskUseCase.execute({ id: Number(id) });
      return res.json(response.task);
    } catch (error: any) {
      console.error('Erro ao buscar tarefa:', error);
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(400).json({ error: 'Erro ao buscar tarefa' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateTaskUseCase = makeUpdateTaskUseCase();

      const response = await updateTaskUseCase.execute({
        id: Number(id),
        data: req.body,
      });
      return res.json(response.task);
    } catch (error: any) {
      console.error('Erro ao atualizar tarefa:', error);
      return res.status(400).json({
        error: 'Erro ao atualizar tarefa',
        details: error.message || error,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deleteTaskUseCase = makeDeleteTaskUseCase();

      await deleteTaskUseCase.execute({ id: Number(id) });
      return res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar tarefa:', error);
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      return res.status(400).json({ error: 'Erro ao deletar tarefa' });
    }
  }
}

export default new TaskController();