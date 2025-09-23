import { Router } from 'express';
import { getProfileHandler } from '../controllers/profileController';

export const profileRouter = Router();

profileRouter.get('/', getProfileHandler);
