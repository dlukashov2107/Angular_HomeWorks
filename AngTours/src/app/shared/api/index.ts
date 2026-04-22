import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const apiData = {
  auth: `${environment.server}/auth`,
  register: `${environment.server}/register`,
  tours: `${environment.server}/tours`,
  tour: `${environment.server}/tour/`,
  countries: `${environment.server}/countries`,
  getWeather: 'https://api.open-meteo.com/v1/forecast',
  countryByCode: 'https://restcountries.com/v3.1/alpha',
} as const;

export const API = new InjectionToken('app.config', {
  providedIn: 'root',
  factory: () => apiData,
});
