import { Router } from 'express';
import { listProjectsHandler } from '../controllers/projectController';

export const projectRouter = Router();

projectRouter.get('/', listProjectsHandler);
