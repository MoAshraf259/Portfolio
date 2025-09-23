import { Router } from 'express';
import { healthRouter } from './healthRouter';
import { profileRouter } from './profileRouter';
import { experienceRouter } from './experienceRouter';
import { educationRouter } from './educationRouter';
import { projectRouter } from './projectRouter';
import { skillRouter } from './skillRouter';
import { certificationRouter } from './certificationRouter';
import { courseRouter } from './courseRouter';
import { contactRouter } from './contactRouter';
import { adminRouter } from './adminRouter';

export const router = Router();

router.use('/health', healthRouter);
router.use('/profile', profileRouter);
router.use('/experiences', experienceRouter);
router.use('/education', educationRouter);
router.use('/projects', projectRouter);
router.use('/skills', skillRouter);
router.use('/certifications', certificationRouter);
router.use('/courses', courseRouter);
router.use('/contact', contactRouter);
router.use('/admin', adminRouter);
