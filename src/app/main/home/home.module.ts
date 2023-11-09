import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TodosComponent } from './components/todos/todos.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TodosHeaderComponent } from './components/todos-header/todos-header.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TodosService } from './services/todos.service';

@NgModule({
  declarations: [
    TodosComponent,
    FooterComponent,
    TodosHeaderComponent,
    TodoFormComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, HttpClientModule],
  providers: [TodosService],
})
export class HomeModule {}
