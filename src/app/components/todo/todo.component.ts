import {Component} from '@angular/core';
import {TodoCreate} from '../../types';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(public todoService: TodoService) {
    console.log(todoService);
  }

  onTodoCreate(todo: TodoCreate) {
    this.todoService.create(todo);
  }
}
