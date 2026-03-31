import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const category = await prisma.category.create({
        data: { name },
      });
      return res.status(201).json(category);
    } catch (error: any) {
      if (error?.code === 'P2002') {
        return res.status(409).json({ error: 'Categoria já existe' });
      }
      return res.status(400).json({ error: 'Erro ao criar categoria' });
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await prisma.category.findMany({
        include: { _count: { select: { tasks: true } } },
      });
      return res.json(categories);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar categorias' });
    }
  }
}

export default new CategoryController();
