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
    this.todoService.getAll().subscribe();

    this.todoService.loading$.subscribe(loading => {
      console.log(loading);
    });

    this.todoService.todosLoading$.subscribe(loading => {
      console.log(loading);
    });
  }

  onAdd(todo: TodoCreate) {
    this.todoService.create(todo).subscribe();
  }

  onDelete(id: number) {
    this.todoService.delete(id).subscribe();
  }

  onToggle(todo: Todo) {
    this.todoService.toggle(todo).subscribe();
  }
}
