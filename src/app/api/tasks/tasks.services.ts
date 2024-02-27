import { type EntityManager } from '@mikro-orm/core';
import {
  type TaskRequest, type TaskResponse, type TaskCategory, type TaskState,
} from './tasks.models';
import Task from './tasks.entity';

const transformToTaskResponse = (task: Task): TaskResponse => ({
  id: task.id,
  name: task.name,
  description: task.description,
  category: task.category as TaskCategory,
  state: task.state as TaskState,
});

const createTask = async (em: EntityManager, taskInput: TaskRequest): Promise<Task> => {
  console.log('Im here');
  console.log('EntityManager', em);
  const newTask = new Task();
  console.log('Im after Task');
  newTask.name = taskInput.name;
  newTask.description = taskInput.description ?? '';
  newTask.category = taskInput.category;
  newTask.state = taskInput.state ?? 'todo' satisfies TaskState;
  console.log('Here is newTask: ', newTask);
  await em.persistAndFlush(newTask);
  return newTask;
  // return transformToTaskResponse(newTask);
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
