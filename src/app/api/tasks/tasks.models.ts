export type TaskCategory = 'work' | 'home';
export type TaskState = 'todo' | 'active' | 'finished';

export interface TaskRequest {
  name: string
  description?: string
  category: TaskCategory
  state?: TaskState
}

export interface TaskResponse {
  id: string
  name: string
  description?: string
  category: TaskCategory
  state: TaskState
}
