import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../interface/todo.interface';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'any'})
export class TodosService {

  private url = './../../../../assets/todos.json'
  constructor(private http: HttpClient) { }

  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(this.url).pipe(
      catchError((err)=> {throw Error(err)}),
      tap(console.log)
    )
  }
}
