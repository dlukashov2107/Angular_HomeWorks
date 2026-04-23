import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../../shared/api';
import {
  IToursResponse,
  ITourResponse,
  ICountriesResponseItem,
  ICountryWeather,
  Coords,
  IPostOrderResponse,
} from '../../models/interfaces';
import {
  catchError,
  delay,
  finalize,
  Observable,
  of,
  switchMap,
  map,
} from 'rxjs';
import { LoaderService } from './loader-api.service';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class TourApiService {
  private api = inject(API);
  private http = inject(HttpClient);
  private loaderServise = inject(LoaderService);
  private mapService = inject(MapService);

  constructor() {}

  getTours(): Observable<IToursResponse> {
    this.loaderServise.setLoader(true);
    return this.http.get<IToursResponse>(`${this.api.tours}`).pipe(
      delay(3000),
      finalize(() => {
        this.loaderServise.setLoader(false);
      }),
    );
  }
  getTourById(id: string): Observable<ITourResponse> {
    return this.http.get<ITourResponse>(`${this.api.tour}${id}`);
  }

  getCountries(): Observable<ICountriesResponseItem[]> {
    this.loaderServise.setLoader(true);
    return this.http.get<ICountriesResponseItem[]>(this.api.countries).pipe(
      catchError(() => of([])),
      delay(2000),
      finalize(() => {
        this.loaderServise.setLoader(false);
      }),
    );
  }

  getCountryByCode(code: string): Observable<ICountryWeather> {
    return this.http
      .get<Coords[]>(this.api.countryByCode, { params: { codes: code } })
      .pipe(
        map((countrieDataArr) => countrieDataArr[0]),
        switchMap((countrieData) => {
          console.log('countryData', countrieData);

          const coords = {
            lat: countrieData.latlng[0],
            lng: countrieData.latlng[1],
          };

          return this.mapService.getWeather(coords).pipe(
            map((weatherResponce) => {
              const current = weatherResponce.current;
              const hourly = weatherResponce.hourly;

              const weatherData = {
                isDay: current.is_day,
                snowfall: current.snowfall,
                rain: current.rain,
                currentWeather: hourly.temperature_2m[15],
              };

              console.log('weatherData', weatherData);

              return { countrieData, weatherData };
            }),
          );
        }),
      );
  }

  postOrder(orderBody: any): Observable<IPostOrderResponse> {
    return this.http.post<any>(this.api.order, orderBody);
  }
}
