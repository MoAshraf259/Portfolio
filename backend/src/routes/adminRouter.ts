import { Router } from 'express';
import {
  getPortfolioAdminHandler,
  listContactsAdminHandler,
  loginHandler,
  meHandler,
  updatePortfolioAdminHandler,
} from '../controllers/adminController';

export const adminRouter = Router();

adminRouter.post('/login', loginHandler);
adminRouter.get('/me', meHandler);
adminRouter.get('/portfolio', getPortfolioAdminHandler);
adminRouter.put('/portfolio', updatePortfolioAdminHandler);
adminRouter.get('/contacts', listContactsAdminHandler);
