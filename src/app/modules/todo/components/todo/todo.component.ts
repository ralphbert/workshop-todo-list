import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo, TodoCreate} from '../../../../types';
import {TodoService} from '../../services/todo.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(public todoService: TodoService) {
    this.todos$ = todoService.todos$;
  }

  ngOnInit(): void {
  }

  onAdd(todo: TodoCreate) {
    this.todoService.create(todo).subscribe();
  }

  onDelete(id: number) {
    this.todoService.delete(id).subscribe();
  }
}
