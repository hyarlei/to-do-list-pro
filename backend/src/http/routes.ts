import { Request, Response, Router } from 'express';
import { z } from 'zod';
import CategoryController from './controllers/CategoryController';
import TaskController from './controllers/TaskController';

const routes = Router();

const createCategorySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100),
});

const createTaskSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(200),
  description: z.string().max(500).nullable().optional(),
  completed: z.boolean().optional().default(false),
  categoryId: z.number().int().positive('ID da categoria deve ser positivo'),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(500).nullable().optional(),
  completed: z.boolean().optional(),
  categoryId: z.number().int().positive().optional(),
});

const bulkCreateTasksSchema = z.array(createTaskSchema);

const validateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: Function) => {
  try {
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    const errors: any[] = [];
    if (error instanceof z.ZodError) {
      error.issues.forEach((e: any) => {
        errors.push({ 
          field: e.path.join('.') || 'root', 
          message: e.message,
          code: e.code
        });
      });
    }
    return res.status(400).json({ 
      error: 'Validação falhou', 
      details: errors,
      body: req.body 
    });
  }
};

const validateParams = (schema: z.ZodSchema) => (req: Request, res: Response, next: Function) => {
  try {
    const validated = schema.parse(req.params);
    req.params = validated as any;
    next();
  } catch (error: any) {
    return res.status(400).json({ error: 'Parâmetro inválido' });
  }
};

routes.post(
  '/categories',
  validateBody(createCategorySchema),
  (req: Request, res: Response) => CategoryController.create(req, res)
);

routes.get('/categories', (req: Request, res: Response) => CategoryController.index(req, res));

routes.post(
  '/tasks/bulk',
  validateBody(bulkCreateTasksSchema),
  async (req: Request, res: Response) => {
    try {
      const prisma = require('../../lib/prisma').default;
      const tasks = await Promise.all(
        req.body.map((taskData: any) => 
          prisma.task.create({ 
            data: taskData,
            include: { category: true }
          })
        )
      );
      return res.status(201).json(tasks);
    } catch (error: any) {
      console.error('Erro ao criar tarefas:', error);
      return res.status(400).json({ error: 'Erro ao criar tarefas em lote', details: error.message });
    }
  }
);

routes.post(
  '/tasks',
  validateBody(createTaskSchema),
  (req: Request, res: Response) => TaskController.store(req, res)
);

routes.get('/tasks', (req: Request, res: Response) => TaskController.index(req, res));

routes.get(
  '/tasks/:id',
  validateParams(z.object({ id: z.string().transform(Number) })),
  (req: Request, res: Response) => TaskController.show(req, res)
);

routes.patch(
  '/tasks/:id',
  validateParams(z.object({ id: z.string().transform(Number) })),
  validateBody(updateTaskSchema),
  (req: Request, res: Response) => TaskController.update(req, res)
);

routes.delete(
  '/tasks/:id',
  validateParams(z.object({ id: z.string().transform(Number) })),
  (req: Request, res: Response) => TaskController.delete(req, res)
);

export default routes;
