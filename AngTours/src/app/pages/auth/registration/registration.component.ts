import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { UserApiService } from '../../../services/api/user-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IRegistrationUser } from '../../../models/interfaces';
import { LoaderService } from '../../../services/api/loader-api.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, MatButtonModule, LoaderComponent,
    AsyncPipe],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private userApiService = inject(UserApiService);
  login: string = '';
  password: string = '';
  passwordRepeat: string = '';
  email: string = '';
  private _snackBar = inject(MatSnackBar);
  private loaderService = inject(LoaderService);
  loaderStatus$ = this.loaderService.loader$;
  
  onReg(ev: Event): void {
    const regUser: IRegistrationUser = {
      login: this.login,
      password: this.password,
      email: this.email,
    };
    this.userApiService.reg(regUser).subscribe(
  (value) => {
    console.log(value);
    this._snackBar.open('Пользователь успешно зарегестрирован', 'Ok');
          this.userService.setUser(this.login);
          this.router.navigate(['/']);
  },
  (error) => {
    console.log('Ошибка', error);
  },
);
  }
}

  //     .subscribe(( { status, error, message }) => { 
  //       if (!error) {
  //         this._snackBar.open(message, 'Ok');
  //         this.userService.setUser(this.login);
  //         this.router.navigate(['/']);
  //       } else {
  //         this._snackBar.open(message, 'Ok');
  //       }
  // }
  //     );
