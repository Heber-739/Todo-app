import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { Todo } from './../../interface/todo.interface';
import { TodosService } from '../../services/todos.service';

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

  dataSource:Todo[] =[];
  columnsToDisplay = ['title','priority','expiration','state'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Todo | null = null;


  constructor(private todoService:TodosService){}


  ngOnInit(): void {
    this.getTodos()
  }

  private getTodos(){
    this.todoService.getTodos().subscribe({
      next:(todos) => {
        this.dataSource = todos
      }
    })
  }









}
