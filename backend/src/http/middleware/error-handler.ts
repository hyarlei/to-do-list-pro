import { NextFunction, Request, Response } from 'express';

export interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';

  console.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  return res.status(statusCode).json({
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
  });
};
