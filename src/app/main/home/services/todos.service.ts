import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../interface/todo.interface';
import { BehaviorSubject, catchError, Observable, of, Subject, Subscription, tap } from 'rxjs';
import * as data from './../../../../assets/todos.json';


@Injectable({providedIn: 'root'})
export class TodosService {

  private allTodos:Todo[] = [];
  private todos = new BehaviorSubject<Todo[]>([]);

  private url = 'assets/todos.json'
  constructor(private http: HttpClient) {
    const obs:Subscription = this.http.get<Todo[]>(this.url).subscribe({
      next:(todos)=>{
        this.allTodos = todos;
        this.todos.next(todos);
      },
      error:(err)=>console.error(err),
      complete:()=>obs.unsubscribe()
    })
  }

  public listenTodos():BehaviorSubject<Todo[]>{
    return this.todos
  }

  filterByText(value:string | null){
    if(!value) this.todos.next(this.allTodos)
    if(value){
      this.todos.next(this.allTodos
        .filter((todo)=> todo.description.includes(value)))
    }
  }

  updateTodo(todo:Todo):Promise<void>{
      this.allTodos = this.allTodos.map((t)=>t.uid===todo.uid?todo:t)
      this.todos.next(this.allTodos);
      return Promise.resolve()
  }

  createTodo(todo:Todo):Promise<void>{
    this.allTodos.unshift(todo)
      this.todos.next(this.allTodos);
    return Promise.resolve()
  }
}
