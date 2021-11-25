import {Todo, TodoCreate} from '../types';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  counter = 1;
  todoList: Todo[] = [{
    id: -10,
    title: 'Müch kaufen'
  }];

  create(todo: TodoCreate) {
    this.todoList.push({
      id: this.counter,
      title: todo.title,
      dueDate: todo.dueDate,
    });
    this.counter += 1;
  }

  delete(id: number) {
    console.log('delete', id);
    // filter
    this.todoList = this.todoList.filter(item => {
      return item.id !== id;
    });
  }

  toggle(todo: Todo) {
    console.log('toggle', todo.id);
    // TODO toggle this
    todo.done = !todo.done;
  }
}
