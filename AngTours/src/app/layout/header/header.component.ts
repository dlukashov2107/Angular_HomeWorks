import { ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { Subscription, Observable } from 'rxjs';
import { ITour } from '../../models/interfaces';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenuComponent, AsyncPipe, OverlayBadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  public userService = inject(UserService);
  private basketService = inject(BasketService);
  basketUnsubscriber: Subscription;

  toursInBasket: number = 0;

  basketStore$: Observable<ITour[]> = null;

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
    this.ngZone.runOutsideAngular(() => {
      return setInterval(() => {
        this.date = new Date();
        this.cdr.detectChanges();
      }, 1000);
    });

    this.basketUnsubscriber = this.basketService.toursInBasket$.subscribe(
      (toursCount) => {
        this.toursInBasket = toursCount;
      },
    );
    this.basketStore$ = this.basketService.basketStore$;
  }

  ngOnDestroy(): void {
    if (this.basketUnsubscriber) this.basketUnsubscriber.unsubscribe();
  }

  //constructor(public userService: UserService) {}
  constructor() {}

  onExit(ev: Event): void {
    this.userService.setUser('');
    this.router.navigate(['/auth']);
  }
}
