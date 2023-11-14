import { Component, Inject, OnInit } from '@angular/core';
import { Priority, State, Todo } from '../../interface/todo.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import {v4 } from 'uuid';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  chips: string[] = [];
  todoForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    priority: [Priority.MEDIUM, [Validators.required]],
    expiration: ['', [Validators.required]],
    state: [State.PENDING, [Validators.required]],
    tags: ['']
  });

  constructor(
    private todoS: TodosService,
    public dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    if(this.data){
      const {tags,uid,creationDate,...others} = this.data;
      this.chips = tags;
      this.todoForm.setValue({tags:'',...others});
    }
  }

  addTag(tag:string){
    this.chips.push(tag);
    this.todoForm.controls['tags'].setValue('')
  }

  deleteChip(index:number){
    this.chips.splice(index,1)
  }

  onSubmit(){
    if(this.todoForm.invalid) return;
    const formData = this.todoForm.value
    if(this.data){
      let updated = Object.assign(this.data,formData)
      updated.tags = this.chips
      this.todoS.updateTodo(updated).then(()=>this.close())
    } else{
      let newTodo:Todo = {
        uid: v4(),
        tags:this.chips,
        creationDate: new Date(),
        ...formData
      }
      this.todoS.createTodo(newTodo).then(()=>this.close())
    }
  }

  close(){
    this.dialogRef.close()
  }
}
