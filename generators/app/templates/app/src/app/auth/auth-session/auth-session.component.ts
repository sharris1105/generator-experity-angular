import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorService } from '../../services/error/error.service';
import { Token } from '../models/token.model';
import { AuthDataService } from '../services/auth-data-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-session',
  templateUrl: './auth-session.component.html'
})
export class AuthSessionComponent implements OnInit, OnDestroy {

  componentDestroy: Subject<void> = new Subject();
  sessionId: string;
  token: string;

  constructor(private readonly _authDataService: AuthDataService
    , private readonly _authService: AuthService
    , private _route: ActivatedRoute
    , private readonly _router: Router
    , private readonly _errorService: ErrorService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this._router.navigate(['/face-sheet']);

      return;
    }

    this._route.queryParams
      .pipe(takeUntil(this.componentDestroy))
      .subscribe(params => {
        this.sessionId = (typeof params.sessionid === 'undefined') ? params.sessionId : params.sessionid;
        if (this.sessionId) {
          console.log('inbound key received from external');
        } else {
          console.log('empty key received.');
        }
      });

    this._authService.clearSession();

    this._authDataService.getSession(this.sessionId)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((token: Token) => {

        this.setLocalStorage(token);
        const session = this._authService.getCurrentSession();
        if (session.isAuthenticated) {
          this._router.navigate(['/face-sheet']);
        } else {
          this._router.navigate(['/error'], { queryParams: { errorCode: token.responseStatusCode, errorMessage: token.responseMessage } });
        }
      }, error => {
        this._errorService.showError(error.status, error.detail);
        console.log(error);
      });
  }

  setLocalStorage(token: Token): void {
    const session = this._authService.getCurrentSession();

    if (!token || !token.payload) {
      session.isAuthenticated = false;

      return;
    }

    session.appCredentials.jwtToken = token.token;
    session.isAuthenticated = true;
    this._authService.setCurrentSession(session);

    const payload = JSON.parse(token.payload);

    sessionStorage.setItem('token', token.token);
    sessionStorage.setItem('practicePk', payload.PracticePk);
    sessionStorage.setItem('patInfoPk', payload.PatInfoPk);
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }
}
