import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReadMeComponent } from './home/read-me/read-me.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'read-me', component: ReadMeComponent },
  {
    path: 'examples',
    loadChildren: './examples/examples.module#ExamplesModule'
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
