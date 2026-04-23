import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITour } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private toursInBasketSubject = new Subject<number>();
  readonly toursInBasket$ = this.toursInBasketSubject.asObservable();

  private basketStore: ITour[] = [];
  basketSubject = new BehaviorSubject(this.basketStore);
  basketStore$ = this.basketSubject.asObservable();

  constructor() {}

  setToursCountInBasket(toursCount: number): void {
    this.toursInBasketSubject.next(toursCount);
  }

  setItemToBasket(item: ITour): void {
    this.basketStore.push(item);
    item.inBasket = true;
    this.basketSubject.next(this.basketStore);
  }

  removeItemFormBasket(item: ITour): void {
    this.basketStore = this.basketStore.filter((tour) => tour !== item);
    item.inBasket = false;
    this.basketSubject.next(this.basketStore);
  }
}
