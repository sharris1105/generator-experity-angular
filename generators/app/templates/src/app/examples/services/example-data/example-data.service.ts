import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VersionInfoModel } from '../../models/version-info.model';

@Injectable({
  providedIn: 'root'
})

export class ExampleDataService {
  private readonly apiBase = 'http://devservices.practicevelocity.com/messagingapi/api/';

  constructor(private readonly http: HttpClient) { }

  getApiVersion(): Promise<VersionInfoModel> {
    return this.http
      .get<VersionInfoModel>(`${this.apiBase}Info/GetVersionInfo`)
      .toPromise();
  }

  badApiCall(): Promise<any> {
    return this.http
      .get('some-bad-url.com')
      .toPromise();
  }
}
