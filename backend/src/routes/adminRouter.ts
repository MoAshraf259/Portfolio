import { Router } from 'express';
import {
  getPortfolioAdminHandler,
  listContactsAdminHandler,
  loginHandler,
  meHandler,
  updatePortfolioAdminHandler,
} from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';

export const adminRouter = Router();

adminRouter.post('/login', loginHandler);
adminRouter.use(authMiddleware);
adminRouter.get('/me', meHandler);
adminRouter.get('/portfolio', getPortfolioAdminHandler);
adminRouter.put('/portfolio', updatePortfolioAdminHandler);
adminRouter.get('/contacts', listContactsAdminHandler);
