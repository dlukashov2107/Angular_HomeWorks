import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  public userService = inject(UserService);
  menuItems = [
    {
      route: 'auth',
      title: 'Авторизация',
    },
    {
      route: 'tours',
      title: 'Главная',
    },
    {
      route: 'settings',
      title: 'Настройки',
    },
  ];

  date = new Date();
  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
  //constructor(public userService: UserService) {}
  constructor() {}

  onExit(ev: Event): void {
    this.userService.setUser('');
    this.router.navigate(['/auth']);
  }
}
