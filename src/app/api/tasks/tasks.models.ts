import type Task from './tasks.entity';

export type TaskCategory = 'work' | 'home';
export type TaskState = 'todo' | 'active' | 'finished';

export interface TaskRequestBody {
  name: string
  description?: string
  category: TaskCategory
  state?: TaskState
}

export interface TaskResponseBody {
  id: string
  name: string
  description?: string
  category: TaskCategory
  state: TaskState
}

export const entityToTaskResponse = (task: Task): TaskResponseBody => ({
  id: task.id,
  name: task.name,
  description: task.description,
  category: task.category as TaskCategory,
  state: task.state as TaskState,
});
