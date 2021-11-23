import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: 'todo-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent {
  @Input() todoTitle = '';

  onInput(todoTitle: string) {
    console.log(todoTitle);
    this.todoTitle = todoTitle;
  }

  onDone() {
    console.log('onDone', this.todoTitle);
  }
}
