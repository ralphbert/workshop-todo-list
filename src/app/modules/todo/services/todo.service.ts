import {Injectable} from '@angular/core';
import {Todo, TodoCreate} from '../../../types';
import {BehaviorSubject, catchError, MonoTypeOperatorFunction, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private loadingSet = new Set<number>();

  private todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todos$$.asObservable();

  private loading$$ = new BehaviorSubject<boolean>(false);
  loading$ = this.loading$$.asObservable();

  private todosLoading$$ = new BehaviorSubject(Array.from(this.loadingSet));
  todosLoading$ = this.todosLoading$$.asObservable();

  endpoint = `${environment.api.url}/todos`;

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Todo[]> {
    this.loading$$.next(true);

    return this.httpClient.get<Todo[]>(this.endpoint)
      .pipe(
        this.loadingOperator(),
        tap((todos) => {
          this.todos$$.next(todos);
        }),
      );
  }

  create(createTodo: TodoCreate): Observable<Todo> {
    return this.httpClient.post<Todo>(this.endpoint, createTodo)
      .pipe(
        tap((todo) => {
          this.todos$$.next([
            ...this.todos$$.getValue(),
            todo,
          ]);
          this.loading$$.next(false);
        }),
      );
  }

  delete(todoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.endpoint}/${todoId}`)
      .pipe(
        this.loadDetailOperator(todoId),
        tap(() => {
          const todos = this.todos$$.getValue().filter(currentItem => currentItem.id !== todoId);
          this.todos$$.next(todos);
        }),
      );
  }

  update(todo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`${this.endpoint}/${todo.id}`, todo).pipe(
      this.loadDetailOperator(todo.id),
      tap((newTodo) => {
        const todos: Todo[] = this.todos$$.getValue().map(current => {
          if (current.id === todo.id) {
            return newTodo;
          } else {
            return current;
          }
        });

        this.todos$$.next(todos);
      }),
    );
  }

  toggle(todo: Todo): Observable<Todo> {
    let newTodo: Todo = {
      ...todo,
      done: !todo.done,
    };

    return this.update(newTodo);
  }

  loadingOperator<T>(): MonoTypeOperatorFunction<T> {
    this.loading$$.next(true);

    return (source) => source.pipe(
      tap(() => {
        this.loading$$.next(false);
      }),
      catchError(e => {
        this.loading$$.next(false);
        return throwError(e);
      }),
    );
  }

  loadDetailOperator<T>(id: number): MonoTypeOperatorFunction<T> {
    this.loadingSet.add(id);
    this.todosLoading$$.next(Array.from(this.loadingSet));

    return (source) => source.pipe(
      tap(() => {
        this.loading$$.next(false);
        this.loadingSet.delete(id);
        this.todosLoading$$.next(Array.from(this.loadingSet));
      }),
      catchError(e => {
        this.loading$$.next(false);
        this.loadingSet.delete(id);
        this.todosLoading$$.next(Array.from(this.loadingSet));
        return throwError(e);
      }),
    );
  }
}
