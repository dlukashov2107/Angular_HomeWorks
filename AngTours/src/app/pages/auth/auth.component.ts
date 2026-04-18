import { Component } from '@angular/core';
import { AuthorizationComponent } from './authorization/authorization.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-auth',
  imports: [AuthorizationComponent, RegistrationComponent, MatTabsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
