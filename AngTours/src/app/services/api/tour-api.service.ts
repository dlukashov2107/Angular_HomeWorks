import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '../../shared/api';
import { IToursResponse, ITourResponse } from '../../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourApiService {
  private api = API;
  private http = inject(HttpClient);

  constructor() {}

  getTours(): Observable<IToursResponse> {
    return this.http.get<IToursResponse>(`${this.api.tours}`);
  }
  getTourById(id: string): Observable<ITourResponse> {
    return this.http.get<ITourResponse>(`${this.api.tour}${id}`);
  }
}
