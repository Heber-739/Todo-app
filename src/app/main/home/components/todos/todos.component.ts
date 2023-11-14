import { Component, OnInit, ViewChild } from '@angular/core';

import { State, Todo } from './../../interface/todo.interface';
import { TodosService } from '../../services/todos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],

})


export class TodosComponent implements OnInit {
  displayedColumns: string[] = ['title','priority','expiration','state','menu'];
  todos:Todo[]=[];
  dataSource!:MatTableDataSource<Todo>;
  todoEdit:Todo | null = null;

  colors: {[key:string]:string} = {
    "DONE":'primary',
    "PENDING":'accent',
  }

  uids:string[]=[]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private todoService:TodosService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.getTodos()
  }

  private getTodos(){
    this.todoService.listenTodos().subscribe({
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

  addTodo(todo:Todo){
    this.todos.unshift(todo);
  }

  updateTodo(todo:Todo){
    this.todos = this.todos.map((t)=>t.uid===todo.uid ? todo:t)
  }

  editTodo(todo:Todo){
    this.dialog.open(TodoFormComponent,{data:todo})
  }

}
