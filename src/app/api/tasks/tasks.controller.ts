import { type Request, type Response } from 'express';
import { type TaskRequest } from './tasks.models';
import taskService from './tasks.services';

const createTask = (req: any, res: Response): Response => {
  if (req.validationError) {
    return res.status(400).json(req.validationError);
  }
  const newTask = taskService.createTask(req.body as TaskRequest);
  return res.status(201).json(newTask);
};

const getAllTasks = (req: Request, res: Response): Response => {
  taskService.getAllTasks();
  return res.status(200);
};

const getTaskById = (req: Request, res: Response): Response => {
  taskService.getTaskById(req.body.id as string);
  return res.status(200);
};

const updateTask = (req: Request, res: Response): Response => {
  taskService.updateTask(req.body.id as string, req.body as TaskRequest);
  return res.status(200);
};

const deleteTask = (req: Request, res: Response): Response => {
  taskService.deleteTask(req.body.id as string);
  return res.status(204);
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
