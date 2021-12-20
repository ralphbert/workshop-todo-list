import {Component, OnInit} from '@angular/core';
import {Todo, TodoCreate} from '../../../../types';
import {TodoService} from '../../../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  constructor(public todoService: TodoService) {
    console.log(todoService);
  }

  ngOnInit() {
    console.log('TodoComponent.ngOnInit');
    //this.todoService.get().subscribe();
  }

  onTodoCreate(todo: TodoCreate) {
    this.todoService.create(todo).subscribe(todo => {
      console.log('todo created!', todo);
    });
  }

  onDelete(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(() => {
    });
  }

  onToggle(todo: Todo) {
    this.todoService.toggle(todo).subscribe();
  }
}
