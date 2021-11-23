import {Todo, TodoCreate} from '../types';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  counter = 1;
  todoList: Todo[] = [];

  create(todo: TodoCreate) {
    this.todoList.push({
      id: this.counter,
      title: todo.title,
      dueDate: todo.dueDate,
    });
  }

  delete(id: number) {
    // filter
  }

  toggle(todo: Todo) {
    // TODO toggle this
    todo.done = !todo.done;
  }
}
