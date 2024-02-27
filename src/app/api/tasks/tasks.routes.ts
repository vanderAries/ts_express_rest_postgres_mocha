/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import taskController from './tasks.controller';

const router = Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
