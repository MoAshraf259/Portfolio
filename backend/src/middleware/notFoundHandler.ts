import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Resource not found',
    path: req.originalUrl,
  });
};
