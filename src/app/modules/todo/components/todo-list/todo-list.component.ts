import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../../../types';
import {listAnimation, slideAnimation} from '../../../../animations';

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

  constructor() {
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
}
