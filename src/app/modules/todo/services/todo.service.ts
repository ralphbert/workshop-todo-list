import { Injectable } from '@angular/core';
import {Todo, TodoCreate} from '../../../types';
import {BehaviorSubject, map, Observable, of, tap} from 'rxjs';

let counter = 2;

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todos$$.asObservable();

  constructor() { }

  create(createTodo: TodoCreate): Observable<Todo> {
    return of(createTodo).pipe(
      map(create => {
        return {
          ...create,
          id: counter++,
        }
      }),
      tap(todo => this.todos$$.next([...this.todos$$.getValue(), todo])),
    );
  }

  delete(todoIndex: number): Observable<void> {
    const todos = this.todos$$.getValue().filter(currentItem => currentItem.id !== todoIndex);
    this.todos$$.next(todos);
    return of(undefined);
  }
}
