import { Router } from 'express';
import { createContactHandler } from '../controllers/contactController';

export const contactRouter = Router();

contactRouter.post('/', createContactHandler);
