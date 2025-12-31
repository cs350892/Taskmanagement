import express from 'express';
import { createTask, assignTask, getTasks, updateStatus, deleteTask } from '../controllers/task.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router()

router.post('/', authMiddleware, createTask)
router.patch('/:id', authMiddleware, updateStatus)
router.patch('/:id/assign', authMiddleware, assignTask)
router.get('/', authMiddleware, getTasks)
router.delete('/:id', authMiddleware, deleteTask)

export default router