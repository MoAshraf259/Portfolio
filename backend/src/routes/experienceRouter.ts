import { Router } from 'express';
import { listExperiencesHandler } from '../controllers/experienceController';

export const experienceRouter = Router();

experienceRouter.get('/', listExperiencesHandler);
