import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {TodoCreate} from '../../../../types';

@Component({
  selector: 'app-todo-form',
  templateUrl: 'todo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  todoTitle = '';
  @Output() todoSubmit = new EventEmitter<TodoCreate>();

  onInput(todoTitle: string) {
    this.todoTitle = todoTitle;
  }

  onDone() {
    if (this.todoTitle) {
      this.todoSubmit.emit({
        done: false,
        title: this.todoTitle,
      });

      this.todoTitle = '';
    }
  }
}
