import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../config/logger';

interface AppError extends Error {
  statusCode?: number;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ZodError) {
    const formatted = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    return res.status(400).json({ message: 'Validation error', errors: formatted });
  }

  const status = err.statusCode ?? 500;

  if (status >= 500) {
    logger.error(err.stack ?? err.message);
  }

  res.status(status).json({
    message: err.message || 'Unexpected error occurred',
    details: err.details,
  });
};
