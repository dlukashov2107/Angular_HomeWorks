import { Injectable, inject } from '@angular/core';
import { TourApiService } from './api/tour-api.service';
import {
  Observable,
  Subject,
  catchError,
  delay,
  forkJoin,
  of,
  map,
  finalize,
} from 'rxjs';
import {
  IToursResponse,
  ITourResponse,
  ITour,
  ITourTypes,
  ICountriesResponseItem,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private toursApi = inject(TourApiService);
  private tourTypeSubject = new Subject<ITourTypes>();
  private tourDateSubject = new Subject<string>();
  readonly tourType$ = this.tourTypeSubject.asObservable();
  readonly tourDate$ = this.tourDateSubject.asObservable();
  constructor() {}

  //getTours(): Observable<IToursResponse> {
  //return this.toursApi.getTours(); }
  getTours(): Observable<ITour[]> {
    const tours$ = this.toursApi.getTours();
    const countries$ = this.toursApi.getCountries();

    return forkJoin<[ICountriesResponseItem[], IToursResponse]>([
      countries$,
      tours$,
    ]).pipe(
      delay(1000),

      map((data) => {
        console.log('data', data);
        let toursWithCountries = [] as ITour[];

        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach((country) => {
          countriesMap.set(country.iso_code2, country);
        });

        if (Array.isArray(toursArr)) {
          toursWithCountries = toursArr.map<ITour>((tour) => {
            return {
              ...tour,
              country: countriesMap.get(tour.code) || null,
            };
          });
        }
        console.log('toursWithCountries', toursWithCountries);
        return toursWithCountries;
      }),

      catchError((err) => {
        console.log('err', err);
        return of([]);
      }),
    );
  }
  getTourById(id: string): Observable<ITourResponse> {
    return this.toursApi.getTourById(id);
  }
  setTourType(type: ITourTypes): void {
    this.tourTypeSubject.next(type);
  }
  setTourDate(date: string): void {
    this.tourDateSubject.next(date);
  }

  getCountryByCode(code: string) {
    return this.toursApi.getCountryByCode(code);
  }
}
