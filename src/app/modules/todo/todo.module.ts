import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoFormComponent} from './components/todo-form/todo-form.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import { TodoComponent } from './components/todo/todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    TodoListComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoComponent,
  ],
  exports: [
    TodoListComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoComponent,
  ]
})
export class TodoModule { }
