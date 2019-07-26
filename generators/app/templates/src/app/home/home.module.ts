import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { HomeComponent } from './home.component';
import { ReadMeComponent } from './read-me/read-me.component';

@NgModule({
  declarations: [HomeComponent, ReadMeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    HomeComponent,
    ReadMeComponent
  ]
})
export class HomeModule { }
