import { Injectable, inject } from '@angular/core';
import { TourApiService } from './api/tour-api.service';
import { Observable, Subject } from 'rxjs';
import { IToursResponse, ITourResponse, ITour, ITourTypes } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private toursApi = inject(TourApiService);
  private tourTypeSubject = new Subject<ITourTypes>();
  private tourDateSubject = new Subject<String>();
  readonly tourType$ = this.tourTypeSubject.asObservable();
  readonly tourDate$ = this.tourDateSubject.asObservable();
  constructor() {}

  getTours(): Observable<IToursResponse> {
    return this.toursApi.getTours();
  }
  getTourById(id: string): Observable<ITourResponse> {
    return this.toursApi.getTourById(id);
  }
  setTourType(type: ITourTypes):void{
    this.tourTypeSubject.next(type); 
  }
  setTourDate(date: string):void{
    this.tourDateSubject.next(date); 
  }
}
