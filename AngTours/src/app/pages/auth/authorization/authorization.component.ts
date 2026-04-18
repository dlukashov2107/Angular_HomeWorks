import { NgClass } from '@angular/common';
import { Component, OnDestroy, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../../../services/user.service';
import { UserApiService } from '../../../services/api/user-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthorizationUser } from '../../../models/interfaces';

@Component({
  selector: 'app-authorization',
  imports: [NgClass, FormsModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private router = inject(Router);
  login: string = '';
  password: string = '';
  saveInStore: boolean = false;
  private userApiService = inject(UserApiService);
  private _snackBar = inject(MatSnackBar);

  constructor(private userService2: UserService) {} //Старый синтаксис

  ngOnInit(): void {
    //console.log('author Init');
  }

  ngOnDestroy(): void {
    //console.log('author destroy');
  }

  onAuth(ev: Event): void {
    const authUser: IAuthorizationUser = {
      login: this.login,
      password: this.password,
    };
    this.userApiService.auth(authUser).subscribe(
      (value) => {
        console.log(value);
        this._snackBar.open('Вы успешно вошли в систему', 'Ok');
        if (this.saveInStore) {
          this.userService.saveUserInStore(this.login);
        } else {
          this.userService.setUser(this.login);
        }
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error, error);
        this._snackBar.open('Ошибка авторизации', 'Ok');
      },
    );
  }
}

// .subscribe(({ status, error, message }) => {
//   if (!error) {
//     this._snackBar.open(message, 'Ok');
//     if (this.saveInStore) {
//       this.userService.saveUserInStore(this.login);
//     } else {
//       this.userService.setUser(this.login);
//     }
//     this.router.navigate(['/']);
//   }

//   else {
//     this._snackBar.open(message, 'Ok');
//   }
// });
