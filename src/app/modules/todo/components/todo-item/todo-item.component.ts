import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../../../types';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;
  @Output() todoDelete = new EventEmitter<Todo>();
  @Output() todoToggle = new EventEmitter<Todo>();
}
