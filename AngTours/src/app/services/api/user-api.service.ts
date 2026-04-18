import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../../shared/api';
import {
  IAuthorizationUser,
  IRegistrationUser,
  IAuthUserResponse,
  IRegUserResponse,
} from '../../models/interfaces';

@Injectable({
  providedIn: 'root', //Здесь мы указываем, что UserApiService - это singletone
})
export class UserApiService {
  private api = API;
  private http = inject(HttpClient);

  constructor() {}

  auth(body: IAuthorizationUser): Observable<IAuthUserResponse> {
    return this.http.post<IAuthUserResponse>(this.api.auth, body);
  }
  reg(body: IRegistrationUser): Observable<IRegUserResponse> {
    return this.http.post<IRegUserResponse>(this.api.register, body);
  }
}

// reg(body: IRegistrationUser): Observable<string> {
//   return this.http.post(this.api.register, body, {responseType: 'text'});
// }
