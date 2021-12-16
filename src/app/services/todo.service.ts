import {Todo, TodoCreate} from '../types';
import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, switchMap} from 'rxjs';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  query,
  setDoc
} from '@angular/fire/firestore';
import {AuthService} from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosCollection = collection(this.firestore, 'todos');
  private todoList$$ = new BehaviorSubject<Todo[]>([]);
  todoList$: Observable<Todo[]> = this.todoList$$.asObservable();

  constructor(public firestore: Firestore, public authService: AuthService) {
    const todoQuery = query(this.todosCollection);

    onSnapshot(todoQuery, q => {
      const todos: Todo[] = [];

      q.forEach(item => {
        todos.push({
          ...(item.data() as Todo),
          id: item.id,
        });
      });

      this.todoList$$.next(todos);
    });
  }

  create(todo: TodoCreate): Observable<Todo> {
    const promise = addDoc(this.todosCollection, {
      ...todo,
      done: false,
    })
      .then(doc => getDoc(doc))
      .then(d => d.data() as Todo);

    return from(promise);
  }

  delete(id: string): Observable<void> {
    const promise = deleteDoc(doc(this.firestore, 'todos', id));
    return from(promise);
  }

  update(todo: Todo): Observable<Todo> {
    const todoRef = doc(this.firestore, 'todos', todo.id);
    return from(setDoc(todoRef, todo, {merge: true}))
      .pipe(
        switchMap(() => getDoc(todoRef).then(d => ({
          ...(d.data() as Todo),
          id: todo.id,
        }))),
      );
  }

  toggle(todo: Todo): Observable<Todo> {
    return this.update({
      ...todo,
      done: !todo.done,
    });
  }
}
