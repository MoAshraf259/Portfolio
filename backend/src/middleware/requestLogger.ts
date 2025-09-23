import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const started = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - started;
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
};
