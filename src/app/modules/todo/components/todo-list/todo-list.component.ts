import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../../../types';
import {listAnimation, slideAnimation} from '../../../../animations';
import {TodoService} from '../../services/todo.service';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    slideAnimation,
    listAnimation,
  ],
})
export class TodoListComponent {
  @Input() todos: Todo[] | null = [];
  @Output() todoDelete = new EventEmitter<Todo>();
  @Output() todoToggle = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {
  }

  get todosDone() {
    return this.todos?.filter(todo => todo.done) || [];
  }

  get todosOpen() {
    return this.todos?.filter(todo => !todo.done) || [];
  }

  trackByTodo(i: number, todo: Todo) {
    return todo.id;
  }

  onDelete(todo: Todo) {
    this.todoDelete.emit(todo);
  }

  onClick(todo: Todo) {
    this.todoToggle.next(todo);
  }

  isLoading$(todo: Todo): Observable<boolean> {
    return this.todoService.todosLoading$.pipe(
      map(ids => {
        return ids.includes(todo.id) || false;
      }),
    );
  }
}
