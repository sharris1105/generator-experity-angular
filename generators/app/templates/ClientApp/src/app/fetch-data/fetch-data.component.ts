import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherForecast } from '../models/WeatherForecast';
import { DataService } from '../services/data.service';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe.decorator';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [DataService]
})

@AutoUnsubscribe
export class FetchDataComponent implements OnInit, OnDestroy {
  forecasts: WeatherForecast[] = [];
  componentDestroy;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getWeatherForecasts()
      .subscribe(result => {
        this.forecasts = result;
        console.log(result);
      }, error => console.error(error));
  }

  ngOnDestroy(): void { }
}
