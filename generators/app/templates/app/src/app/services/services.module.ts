import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [ErrorComponent],
  entryComponents: [ErrorComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class ServicesModule { }
