import { initializate } from './../main/home/ngrx/todo.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../main/home/interface/todo.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';


@Injectable({providedIn: 'root'})
export class TodosService {

  private allTodos:Todo[] = [];
  private todos = new BehaviorSubject<Todo[]>([]);

  private url = 'assets/todos.json'


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
