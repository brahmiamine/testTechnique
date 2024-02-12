import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import messageRoutes from './message.routes';

const router: Router = Router();

router.use('/users', userRoutes);
router.use('/', authRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);

export default router;
