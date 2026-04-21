import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API } from '../../shared/api';
import {
  IAuthorizationUser,
  IRegistrationUser,
  IAuthUserResponse,
  IRegUserResponse,
} from '../../models/interfaces';
import { delay, finalize, Observable } from 'rxjs';
import { LoaderService } from './loader-api.service';

@Injectable({
  providedIn: 'root', //Здесь мы указываем, что UserApiService - это singletone
})
export class UserApiService {
  private api = API;
  private http = inject(HttpClient);
  private loaderServise = inject(LoaderService);

  constructor() {}


  auth(body: IAuthorizationUser): Observable<IAuthUserResponse> {
    this.loaderServise.setLoader(true);
    return this.http.post<IAuthUserResponse>(this.api.auth, body).pipe(
      delay(1000),
      finalize(() => {
        this.loaderServise.setLoader(false);
      }),
    );
  }
  reg(body: IRegistrationUser): Observable<IRegUserResponse> {
    this.loaderServise.setLoader(true);
    return this.http.post<IRegUserResponse>(this.api.register, body).pipe(
      delay(1000),
      finalize(() => {
        this.loaderServise.setLoader(false);
      }),
    );
  }
}
