import express from 'express';

import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import laboratoryRoutes from './laboratoryRoutes';
import establishmentRoutes from './establishmentRoutes';
import labDirectorRoutes from './labDirectorRoutes';
import candidateRoutes from './candidateRoutes';

import { isAuth } from '../../../middlewares/authMiddleware';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/user', isAuth, userRoutes);

router.use('/laboratory', isAuth, laboratoryRoutes);

router.use('/establishment', isAuth, establishmentRoutes);

router.use('/lab-director', isAuth, labDirectorRoutes);

router.use('/candidate', isAuth, candidateRoutes);

export default router;