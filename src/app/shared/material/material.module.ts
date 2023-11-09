import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  exports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
})
export class MaterialModule {}
