import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoComponent} from './components/todo/todo.component';
import {TodoFormComponent} from './components/todo-form/todo-form.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {TodoRoutingModule} from './todo-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, TodoRoutingModule, FormsModule],
  declarations: [
    TodoComponent,
    TodoFormComponent,
    TodoListComponent,
  ],
  exports: [
    TodoComponent,
  ],
})
export class TodoModule {

}
