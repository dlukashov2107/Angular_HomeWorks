import { Injectable, inject } from '@angular/core';
import { TourApiService } from './api/tour-api.service';
import { Observable } from 'rxjs';
import { IToursResponse, ITourResponse, ITour } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private toursApi = inject(TourApiService);
  constructor() {}

  getTours(): Observable<IToursResponse> {
    return this.toursApi.getTours();
  }
  getTourById(id: string): Observable<ITourResponse> {
    return this.toursApi.getTourById(id);
  }
}
