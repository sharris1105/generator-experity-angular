import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ApiExamplesComponent } from './api-examples/api-examples.component';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { StateManagementExamplesComponent } from './state-management-examples/state-management-examples.component';
import { UiExamplesComponent } from './ui-examples/ui-examples.component';

@NgModule({
  declarations: [UiExamplesComponent, ApiExamplesComponent, ExamplesComponent, StateManagementExamplesComponent],
  imports: [
    CommonModule,
    ExamplesRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule
  ]
})
export class ExamplesModule { }
