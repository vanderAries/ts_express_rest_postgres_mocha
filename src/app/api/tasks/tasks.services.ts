import { type TaskRequest } from './tasks.models';

const createTask = (taskInput: TaskRequest): TaskRequest => {
  const newTask = taskInput;
  return newTask;
};

const getAllTasks = (): void => {
  console.log('yay');
};

const getTaskById = (taskId: string): void => {
  console.log(taskId);
};

const updateTask = (taskId: string, taskInput: TaskRequest): TaskRequest => {
  const updatedTask = taskInput;
  return updatedTask;
};

const deleteTask = (taskId: string): void => {
  console.log(taskId);
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
