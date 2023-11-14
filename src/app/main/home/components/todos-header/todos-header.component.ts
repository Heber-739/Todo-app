import { TodoFormComponent } from './../todo-form/todo-form.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todos-header',
  templateUrl: './todos-header.component.html',
  styleUrls: ['./todos-header.component.css']
})
export class TodosHeaderComponent {

  constructor(public dialog: MatDialog){}

  openDialog(){
    this.dialog.open(TodoFormComponent)
  }

}
