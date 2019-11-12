import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../../../environments/constants';
import { Token } from '../models/token.model';

@Injectable()
export class AuthDataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private readonly _http: HttpClient) { }

  getSession(sessionId: string): Observable<Token> {
    const payload = {
      SessionId: sessionId
    };

    return this._http.post(`${Constants.FACE_SHEET_API_PATH_BASE}AppAuth/getSession`, payload, this.httpOptions); // TODO: change to feature api path base
  }
}
