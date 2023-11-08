import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [MatIconModule, MatButtonModule, MatTableModule],
})
export class MaterialModule {}
