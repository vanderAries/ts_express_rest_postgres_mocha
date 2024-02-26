type Category = 'work' | 'home';
type State = 'todo' | 'active' | 'finished';

export interface TaskRequest {
  name: string
  description?: string
  category: Category
  state?: State
}
