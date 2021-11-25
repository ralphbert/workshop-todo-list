import {Todo, TodoCreate} from '../types';
import {Injectable} from '@angular/core';
import {delay, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  counter = 1;
  todoList: Todo[] = [{
    id: -10,
    title: 'Müch kaufen'
  }];

  create(todo: TodoCreate): Observable<Todo> {
    const newTodo: Todo = {
      id: this.counter,
      title: todo.title,
      dueDate: todo.dueDate,
    };
    this.counter += 1;

    return of(newTodo).pipe(
      delay(1500),
      tap((todo) => {
        this.todoList.push(todo);
      }),
    );
  }

  delete(id: number): Observable<void> {
    return of(undefined).pipe(
      delay(200),
      tap(() => {
        this.todoList = this.todoList.filter(item => {
          return item.id !== id;
        });
      }),
    );
  }

  toggle(todo: Todo): Observable<Todo> {
    return of(todo).pipe(
      delay(200),
      tap((todo) => {
        this.todoList = this.todoList.map(currentTodo => {
          if (todo.id === currentTodo.id) {
            return {
              ...currentTodo,
              done: !currentTodo.done,
            };
          }

          return currentTodo;
        });
      }),
    );
  }
}
