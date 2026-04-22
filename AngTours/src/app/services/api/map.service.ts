import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILocation } from '../../models/interfaces';
import { Observable } from 'rxjs';
import { IWeatherResponce } from '../../models/map';
import { API } from '../../shared/api';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  api = inject(API);

  constructor(private http: HttpClient) {}

  getWeather(coords: ILocation): Observable<IWeatherResponce> {
    const params = {
      latitude: coords.lat,
      longitude: coords.lng,
      hourly: 'temperature_2m',
      current: ['is_day', 'snowfall', 'rain'],
      forecast_days: 1,
    };
    return this.http.get<IWeatherResponce>(this.api.getWeather, { params });
  }
}
