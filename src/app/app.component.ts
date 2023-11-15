import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Todo } from './main/home/interface/todo.interface';
import { initializate } from './main/home/ngrx/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todoApp';


  constructor(
    private http: HttpClient,
    private store:Store) {
    const obs:Subscription = this.http.get<Todo[]>('assets/todos.json').subscribe({
      next:(todos)=> this.store.dispatch(initializate({todos})),
      error:(err)=>console.error(err),
      complete:()=>obs.unsubscribe()
    })
  }



}
