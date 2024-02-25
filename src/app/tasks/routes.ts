import { Router } from 'express';
import taskController from './controllers';
import validateTaskData from '../middleware/validation';

const router = Router();

router.post('/', validateTaskData, taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validateTaskData, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
