import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'prefix' }, // TODO: uncomment to implement app auth and adjust lower routes
  // { path: 'home', component: AuthSessionComponent },

  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'examples', loadChildren: () => import('./examples/examples.module')
      .then(m => m.ExamplesModule)//, canActivate: [AuthGuard]    // TODO: add auth guard as needed
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
