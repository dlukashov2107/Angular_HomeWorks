import { Injectable } from '@angular/core';
import { ITour } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: string;
  tour: ITour;

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

  setTour(tour: ITour): void {
    this.tour = tour;
  }
  getTour(): ITour {
    return this.tour;
  }
}
