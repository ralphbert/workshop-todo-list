import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TodoFormComponent} from './components/todo-form/todo-form.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TodoComponent} from './components/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
