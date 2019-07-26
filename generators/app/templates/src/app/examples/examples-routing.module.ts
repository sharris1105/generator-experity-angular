import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiExamplesComponent } from './api-examples/api-examples.component';
import { ExamplesComponent } from './examples.component';
import { UiExamplesComponent } from './ui-examples/ui-examples.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
  { path: 'ui', component: UiExamplesComponent },
  { path: 'api', component: ApiExamplesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule { }
