import express from 'express';

import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import laboratoryRoutes from './laboratoryRoutes';

import { isAuth } from '../../../middlewares/authMiddleware';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/user', isAuth, userRoutes);

router.use('/laboratory', isAuth, laboratoryRoutes);

export default router;