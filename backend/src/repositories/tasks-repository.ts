import { Prisma } from '@prisma/client';

export interface FindAllOptions {
  include?: {
    category?: boolean;
  };
  orderBy?: Prisma.TaskOrderByWithRelationInput;
}

export interface TasksRepository {
  create(data: Prisma.TaskCreateInput): Promise<any>;
  findAll(options?: FindAllOptions): Promise<any[]>;
  findById(id: number): Promise<any | null>;
  update(id: string | number, data: Prisma.TaskUpdateInput): Promise<any>;
  delete(id: string | number): Promise<void>;
}