import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { State, Todo } from './../../interface/todo.interface';
import { TodosService } from '../../services/todos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class TodosComponent implements OnInit {
  displayedColumns: string[] = ['title','priority','expiration','state'];
  todos:Todo[]=[];
  dataSource!:MatTableDataSource<Todo>;
  todoDetail:Todo | null = null;

  colors: {[key:string]:string} = {
    "DONE":'primary',
    "PENDING":'accent',
  }

  uids:string[]=[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private todoService:TodosService){}

  ngOnInit(): void {
    this.getTodos()
  }

  private getTodos(){
    this.todoService.getTodos().subscribe({
      next:(todos) => {
        this.todos = todos
        this.setPaginator()

      }
    })
  }

  private setPaginator(){
    this.dataSource = new MatTableDataSource<Todo>(this.todos)
    this.dataSource.paginator = this.paginator;
  }

  changeStatus(uid:string){
    this.todos = this.todos.map((todo)=>{
      if(todo.uid === uid){
        todo.state = todo.state === State.DONE ? State.PENDING:State.DONE
      }
      return todo;
    })
  }

  openTodo(todo:Todo){
    this.todoDetail = this.todoDetail && this.todoDetail.uid === todo.uid ? null : todo;
  }
}
