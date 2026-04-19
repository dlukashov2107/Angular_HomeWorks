import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>(); //Приватные свойства помечаются _
  readonly loader$ = this.loaderSubject.asObservable(); //Если на объект можно подписаться, то его помечают $
  constructor() {}

  setLoader(val: boolean) {
    this.loaderSubject.next(val);
  }
}
