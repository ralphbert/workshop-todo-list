export interface Todo extends TodoCreate {
  id: number;
}

export interface TodoCreate {
  title: string;
  done: boolean;
}
