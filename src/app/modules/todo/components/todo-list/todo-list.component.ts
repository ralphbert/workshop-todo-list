import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from '../../../../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  @Input() todos: Todo[] | null = [];
  @Output() todoDelete = new EventEmitter<Todo>();

  constructor() {
  }

  trackByTodo(i: number, todo: Todo) {
    return todo.id;
  }

  onDelete(todo: Todo) {
    this.todoDelete.emit(todo);
  }
}
