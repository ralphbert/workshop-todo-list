import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../../../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input()
  todos: Todo[] = [];

  @Output()
  todoToggle = new EventEmitter<Todo>();

  @Output()
  todoDelete = new EventEmitter<Todo>();

  onDelete(event: Event, todo: Todo) {
    event.preventDefault();
    event.stopPropagation();
    this.todoDelete.emit(todo)
  }
}
