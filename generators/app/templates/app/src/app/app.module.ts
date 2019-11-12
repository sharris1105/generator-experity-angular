import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthSessionComponent } from './auth/auth-session/auth-session.component';
import { AuthDataService } from './auth/services/auth-data-service';
import { AuthService } from './auth/services/auth.service';
import { JwtInterceptorService } from './auth/services/jwt-interceptor';
import { AuthGuard } from './guards/auth.guard';
import { NavComponent } from './nav/nav.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ServicesModule } from './services/services.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthSessionComponent,
    NavComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ServicesModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    NavComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    AuthService,
    AuthDataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
