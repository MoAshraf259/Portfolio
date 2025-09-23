import { NextFunction, Request, Response } from 'express';
import { verifyAuthToken } from '../utils/token';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = header.slice('Bearer '.length).trim();
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const payload = verifyAuthToken(token);
    req.user = { email: payload.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
