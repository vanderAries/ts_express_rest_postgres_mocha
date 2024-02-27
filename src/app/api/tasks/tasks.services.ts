import { type EntityManager } from '@mikro-orm/core';
import {
  entityToTaskResponse,
  type TaskRequestBody,
  type TaskResponseBody,
} from './tasks.models';
import Task from './tasks.entity';

const createTask = async (em: EntityManager, taskInput: TaskRequestBody):
Promise<TaskResponseBody> => {
  const newTask = new Task();
  newTask.name = taskInput.name;
  newTask.description = taskInput.description;
  newTask.category = taskInput.category;
  newTask.state = taskInput.state;
  await em.persistAndFlush(newTask);
  return entityToTaskResponse(newTask);
};

const getAllTasks = async (em: EntityManager):
Promise<TaskResponseBody[]> => {
  const tasks = await em.findAll(Task);
  return tasks.map((task) => entityToTaskResponse(task));
};

const getTaskById = async (em: EntityManager, taskId: string):
Promise<TaskResponseBody | null> => {
  const task = await em.findOne(Task, taskId);
  return (task === null) ? null : entityToTaskResponse(task);
};

const updateTask = async (em: EntityManager, taskId: string, taskInput: TaskRequestBody):
Promise<TaskResponseBody | null> => {
  const updatedTask = await em.findOne(Task, taskId);
  if (updatedTask === null) {
    return null;
  }
  updatedTask.name = taskInput.name;
  updatedTask.description = taskInput.description;
  updatedTask.category = taskInput.category;
  updatedTask.state = taskInput.state;
  await em.persistAndFlush(updatedTask);
  return entityToTaskResponse(updatedTask);
};

const deleteTask = async (em: EntityManager, taskId: string):
Promise<TaskResponseBody | null> => {
  const task = await em.findOne(Task, taskId);
  if (task === null) {
    return null;
  }
  await em.remove(task).flush();
  return entityToTaskResponse(task);
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
