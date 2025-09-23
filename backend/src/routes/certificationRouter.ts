import { Router } from 'express';
import { listCertificationsHandler } from '../controllers/certificationController';

export const certificationRouter = Router();

certificationRouter.get('/', listCertificationsHandler);
