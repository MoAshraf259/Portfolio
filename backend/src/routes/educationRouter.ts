import { Router } from 'express';
import { listEducationHandler } from '../controllers/educationController';

export const educationRouter = Router();

educationRouter.get('/', listEducationHandler);
