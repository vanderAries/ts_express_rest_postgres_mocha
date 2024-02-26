import { Router } from 'express';
import taskController from './tasks.controller';
import validateSchema from '../../middleware/schemaValidation';
import { taskInputSchema } from './tasks.schemas';

const router = Router();

router.post('/', validateSchema(taskInputSchema), taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
