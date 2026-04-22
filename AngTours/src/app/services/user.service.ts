import { Injectable } from '@angular/core';
import { ITour } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: string;
  tour: ITour;
  toursInBasket: number = 0;

  constructor() {}

  saveUserInStore(user: string): void {
    this.setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): string {
    return this.user;
  }
  setUser(user: string): void {
    this.user = user;
  }

  getTour(): ITour {
    return this.tour;
  }
  setTour(tour: ITour): void {
    this.tour = tour;
  }

  getToursCountInBasket(): number {
    return this.toursInBasket;
  }
  setToursCountInBasket(toursCount: number): void {
    console.log('setBasket', toursCount);
    this.toursInBasket = toursCount;
  }
}
