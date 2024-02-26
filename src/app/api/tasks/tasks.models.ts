type Category = 'work' | 'home';
type State = 'todo' | 'active' | 'finished';

export interface TaskRequest {
  name: string
  description?: string
  category: Category
  state?: State
}

export interface TaskResponse {
  id: number
  name: string
  description?: string
  category: Category
  state: State
}
