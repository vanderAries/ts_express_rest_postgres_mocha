import { RequestContext } from '@mikro-orm/core';
import { type Request, type Response } from 'express';
import Ajv, { type DefinedError } from 'ajv';
import { type ErrorResponse } from '../../shared/models/errors';
import { type TaskRequest } from './tasks.models';
import { taskInputSchema } from './tasks.schemas';
import taskService from './tasks.services';

const ajv = new Ajv();
const validate = ajv.compile(taskInputSchema);

const createTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { body } = req;
    if (!validate(body)) {
      console.log('Validation Errors: ', validate.errors);
      const errorRes: ErrorResponse = {
        title: 'Validation Error',
        detail:
          "Provided request body is invalid, check 'errors' for more info.",
        errors: validate.errors as DefinedError[],
      };
      return res.status(400).json(errorRes);
    }

    const em = RequestContext.getEntityManager();
    if (em === undefined) {
      throw new Error('EntityManager is undefined');
    }

    const newTask = await taskService.createTask(em, body);
    return res.status(201).json(newTask);
  } catch (error) {
    console.log('Error in taskController: ', error);
    const errorRes: ErrorResponse = {
      title: 'Internal Server Error',
      detail:
        'Server encountered an unexpected problem',
    };
    return res.status(500).json(errorRes);
  }
};

const getAllTasks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await taskService.getAllTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    console.log('Error in taskController');
    const errorRes: ErrorResponse = {
      title: 'Internal Server Error',
      detail:
        'Server encountered an unexpected problem',
    };
    return res.status(500).json(errorRes);
  }
};

const getTaskById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const taskId = req.params.id;
    const task = await taskService.getTaskById(taskId);
    if (task === undefined) {
      const errorRes: ErrorResponse = {
        title: 'Not Found',
        detail: `Task with ID: '${taskId}' was not found.`,
      };
      return res.status(404).json(errorRes);
    }
    return res.status(200).json(task);
  } catch (error) {
    console.log('Error in taskController');
    const errorRes: ErrorResponse = {
      title: 'Internal Server Error',
      detail:
        'Server encountered an unexpected problem',
    };
    return res.status(500).json(errorRes);
  }
};

const updateTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { body } = req;
    if (!validate(body)) {
      console.log('Validation Errors: ', validate.errors);
      const errorRes: ErrorResponse = {
        title: 'Validation Error',
        detail:
          "Provided request body is invalid, check 'errors' for more info.",
        errors: validate.errors as DefinedError[],
      };
      return res.status(400).json(errorRes);
    }

    const taskId = req.params.id;
    const taskInput = body;

    const updatedTask = await taskService.updateTask(taskId, taskInput);

    if (updatedTask === undefined) {
      const errorRes: ErrorResponse = {
        title: 'Not Found',
        detail: `Task with ID: '${taskId}' was not found.`,
      };
      return res.status(404).json(errorRes);
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    console.log('Error in taskController: ', error);
    const errorRes: ErrorResponse = {
      title: 'Internal Server Error',
      detail:
        'Server encountered an unexpected problem',
    };
    return res.status(500).json(errorRes);
  }
};

const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  try {
    const taskId = req.params.id;

    const deletedTask = await taskService.deleteTask(taskId);

    if (deletedTask === undefined) {
      const errorRes: ErrorResponse = {
        title: 'Not Found',
        detail: `Task with ID: '${taskId}' was not found.`,
      };
      return res.status(404).json(errorRes);
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log('Error in taskController');
    const errorRes: ErrorResponse = {
      title: 'Internal Server Error',
      detail:
        'Server encountered an unexpected problem',
    };
    return res.status(500).json(errorRes);
  }
};

export default {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
