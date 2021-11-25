export interface Todo extends TodoCreate {
  id: number;
  created_at: string;
  published_at: string;
  updated_at: string;
}

export interface TodoCreate {
  title: string;
  done: boolean;
  due?: string;
}
