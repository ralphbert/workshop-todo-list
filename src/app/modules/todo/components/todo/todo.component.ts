import {Component, OnInit} from '@angular/core';
import {Todo, TodoCreate} from '../../../../types';
import {TodoService} from '../../../../services/todo.service';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  constructor(public todoService: TodoService, public authService: AuthService) {
    console.log(todoService);
  }

  ngOnInit() {
    console.log('TodoComponent.ngOnInit');
  }

  onTodoCreate(todo: TodoCreate) {
    this.todoService.create(todo).subscribe(todo => {
      console.log('todo created!', todo);
    });
  }

  onDelete(todo: Todo) {
    console.log('onDelete', todo);
    this.todoService.delete(todo.id).subscribe(() => {
      console.log('deleted!');
    });
  }

  onToggle(todo: Todo) {
    this.todoService.toggle(todo).subscribe();
  }
}
