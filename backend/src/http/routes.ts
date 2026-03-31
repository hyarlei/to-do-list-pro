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
  description: z.string().max(500).optional(),
  completed: z.boolean().optional().default(false),
  categoryId: z.number().int().positive('ID da categoria deve ser positivo'),
});

const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(500).nullable().optional(),
  completed: z.boolean().optional(),
  categoryId: z.number().int().positive().optional(),
});

const validateBody = (schema: z.ZodSchema) => (req: Request, res: Response, next: Function) => {
  try {
    const validated = schema.parse(req.body);
    req.body = validated;
    next();
  } catch (error: any) {
    const errors = error.errors?.map((e: any) => ({ field: e.path.join('.'), message: e.message })) || [];
    return res.status(400).json({ error: 'Validação falhou', details: errors });
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
