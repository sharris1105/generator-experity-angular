import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../../../environments/constants';
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe.decorator';
import { Session } from '../models/session.model';

@Injectable()

@AutoUnsubscribe
export class AuthService implements OnDestroy {
  componentDestroy;
  private readonly isAuthenticated: BehaviorSubject<boolean>;
  private readonly currentSession: BehaviorSubject<Session>;

  constructor() {
    this.currentSession = new BehaviorSubject(this.getCurrentSession());
    this.isAuthenticated = new BehaviorSubject(false);
  }

  ngOnDestroy(): void { }

  setCurrentSession(currentSession: Session): void {
    sessionStorage.setItem(Constants.CURRENT_SESSION, JSON.stringify(currentSession));
    this.currentSession.next(currentSession);
    this.setAuthenticated(currentSession.isAuthenticated);
  }

  getCurrentSession(): Session {
    const currentSession: Session = JSON.parse(sessionStorage.getItem(Constants.CURRENT_SESSION))
      || { isAuthenticated: false, appCredentials: { jwtToken: '' } };

    return currentSession;
  }

  clearSession(): void {
    if (sessionStorage) {
      sessionStorage.clear();
      this.setAuthenticated(false);
    }
  }
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticated.next(isAuthenticated);
  }

  getAuthenticated(): Observable<boolean> {
    if (this.getCurrentSession().isAuthenticated) {
      this.setAuthenticated(true);
    } else {
      this.setAuthenticated(false);
    }

    return this.isAuthenticated.asObservable();
  }
}
