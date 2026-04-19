import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../../shared/api';
import { IToursResponse, ITourResponse } from '../../models/interfaces';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from './loader-api.service';

@Injectable({
  providedIn: 'root',
})
export class TourApiService {
  private api = API;
  private http = inject(HttpClient);
  private loaderServise = inject(LoaderService);

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
}
