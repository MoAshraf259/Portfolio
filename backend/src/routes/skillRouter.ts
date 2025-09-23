import { Router } from 'express';
import { listSkillsHandler } from '../controllers/skillController';

export const skillRouter = Router();

skillRouter.get('/', listSkillsHandler);
