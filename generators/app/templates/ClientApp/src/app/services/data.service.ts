import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from '../models/WeatherForecast';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }

  getSampleData(getData: boolean) { // TODO: per coding standards, add returning data type
    return this.httpClient.get(`/api/SampleData/getData/${getData}`);
  }

  getWeatherForecasts(): Observable<WeatherForecast[]> {
    return this.httpClient.get<WeatherForecast[]>('/api/SampleData/WeatherForecasts');
  }
}
