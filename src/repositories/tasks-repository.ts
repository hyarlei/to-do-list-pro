import { Prisma } from '@prisma/client';

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<any>;
  findAll(): Promise<any[]>;
  update(id: string | number, data: Prisma.TaskUpdateInput): Promise<any>;
  delete(id: string | number): Promise<void>;
}