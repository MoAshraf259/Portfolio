import { Router } from 'express';
import { listCoursesHandler } from '../controllers/courseController';

export const courseRouter = Router();

courseRouter.get('/', listCoursesHandler);
