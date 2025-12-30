import express from 'express';
import { createTask, assignTask, getTasks } from '../controllers/task.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTask);
router.post('/assign', authMiddleware, assignTask);
router.get('/', authMiddleware, getTasks);

export default router;