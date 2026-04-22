import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {
  ICountryWeather,
  ILocation,
  ITour,
  ITourTypes,
  IWeatherData,
} from '../../models/interfaces';
import { MatCardModule } from '@angular/material/card';
import {
  NgxMasonryComponent,
  NgxMasonryModule,
  NgxMasonryOptions,
} from 'ngx-masonry';
import { Router } from '@angular/router';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  Subject,
  Subscription,
  debounceTime,
  fromEvent,
  takeUntil,
} from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapComponent } from '../../shared/components/map/map.component';
import { ru_RU, NzI18nService } from 'ng-zorro-antd/i18n';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tours',
  imports: [
    MatCardModule,
    NgxMasonryModule,
    HighlightActiveDirective,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    NzModalModule,
    MapComponent,
    NgIf,
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('highLightDirective', { read: HighlightActiveDirective })
  highLightDirective: HighlightActiveDirective;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  @ViewChild('inputSearch') inputSearch: ElementRef;

  private tourService = inject(ToursService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private i18n = inject(NzI18nService);
  private userService = inject(UserService);

  switchLanguage() {
    this.i18n.setLocale(ru_RU);
  }

  tours: ITour[];
  toursCopy: ITour[];
  toursInBasket: number[];
  masonryOptions: NgxMasonryOptions = { animations: {} };

  typeTourFilter: ITourTypes = null;
  dateTourFilter: string = null;
  inputSearchTourFilter: string = null;

  tours$ = this.tourService.getTours();
  typeUnsubscriber: Subscription;
  dateUnsubscriber: Subscription;
  // private _unsubscriber = new Subject<boolean>();

  public showModal = false;
  public mapCountryName: string = null;
  location: ILocation;
  weatherData: IWeatherData;

  ngOnInit(): void {
    this.toursInBasket = [];
    this.switchLanguage();
    this.tourService.getTours().subscribe((data: ITour[]) => {
      this.tours = data;
      this.toursCopy = [...this.tours];
      this.cdr.detectChanges();
      //console.log('this.tours all', this.tours);
    });

    this.typeUnsubscriber = this.tourService.tourType$.subscribe(
      (type: ITourTypes) => {
        //this.tourService.tourType$.pipe(takeUntil(this._unsubscriber)).subscribe((type)=>{
        // console.log("type", type);
        this.typeTourFilter = type;
        this.initTourFilterLogic();
      },
    );
    this.dateUnsubscriber = this.tourService.tourDate$.subscribe(
      (date: string) => {
        this.dateTourFilter = date;
        this.initTourFilterLogic();
      },
    );
  }

  ngAfterViewInit() {
    fromEvent<InputEvent>(this.inputSearch.nativeElement, 'input')
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.searchTours(value);
      });
  }

  ngOnDestroy(): void {
    if (this.typeUnsubscriber) this.typeUnsubscriber.unsubscribe();
    if (this.dateUnsubscriber) this.dateUnsubscriber.unsubscribe();
    // this._unsubscriber.next(true);
    // this._unsubscriber.complete();
  }

  goToTour(tour: ITour): void {
    if (tour?.id) {
      this.router.navigate([`tour/${tour.id}`]);
    } else {
      console.error('id не найден');
    }
  }

  changeBasketStatus(tour: ITour): void {
    if (this.toursInBasket.length > 0) {
      let index = this.toursInBasket.indexOf(tour.id);
      if (index !== -1) this.toursInBasket.splice(index);
      else this.toursInBasket.push(tour.id);
    } else this.toursInBasket.push(tour.id);

    this.userService.setToursCountInBasket(this.toursInBasket.length);
  }

  sort(item1: HTMLElement, item2: HTMLElement): number {
    if (parseFloat(item1.style.top) == parseFloat(item2.style.top)) {
      return parseFloat(item1.style.left) < parseFloat(item2.style.left)
        ? -1
        : 1;
    } else {
      return parseFloat(item1.style.top) - parseFloat(item2.style.top);
    }
  }

  onEnter(ev: { el: HTMLElement; index: number }) {
    const tourId = ev.el.getAttribute('data-tour-id');
    const num = tourId;
    if (tourId) {
      //this.goToTour(this.tours.find(item => item.id === num as unknown as number));
      this.goToTour({ id: tourId } as unknown as ITour);
    } else {
      console.log('id не найден');
    }
  }

  searchTours(ev: InputEvent): void {
    //console.log('searching');

    const searchValue = (ev.target as HTMLInputElement).value;
    this.inputSearchTourFilter = searchValue;
    // const regExp = new RegExp(searchValue, 'i');

    // if (!searchValue) {
    //   this.tours = [...this.toursCopy];
    // } else {
    //   this.tours = this.toursCopy.filter((el) => {
    //     return regExp.test(el.name);
    //   });
    // }
    // setTimeout(() => {
    //   //this.showMasonry = true;
    //   this.masonry.reloadItems();
    //   this.masonry.layout();
    // });
    this.initTourFilterLogic();
  }

  updateView(): void {
    setTimeout(() => {
      this.highLightDirective.initItems();
    });
  }

  initTourFilterLogic(): void {
    //logic for type
    let filteredArr = [...this.toursCopy];
    if (this.typeTourFilter) {
      switch (this.typeTourFilter) {
        case 'group':
          filteredArr = this.toursCopy.filter((el) => el.type === 'multi');
          break;
        case 'single':
          filteredArr = this.toursCopy.filter((el) => el.type === 'single');
          break;
        case 'all':
          filteredArr = [...this.toursCopy];
          break;
      }
    }

    //logic for Date
    if (this.dateTourFilter) {
      console.log('this.dateTourFilter', this.dateTourFilter);
      filteredArr = filteredArr.filter((el) => {
        el.date === this.dateTourFilter;
        console.log(el.date);
      });
    }

    //logic for Input

    if (this.inputSearchTourFilter) {
      // console.log("this.inputSearchTourFilter", this.inputSearchTourFilter);
      const regExp = new RegExp(this.inputSearchTourFilter, 'i');
      filteredArr = filteredArr.filter((el) => {
        return regExp.test(el.name);
      });
    }

    this.tours = filteredArr;

    setTimeout(() => {
      this.masonry.reloadItems();
      this.masonry.layout();
    });
  }

  showMap(ev: Event, tour: ITour, code: string): void {
    this.mapCountryName = tour.country?.name_ru;
    this.showModal = true;
    // ev.stopPropagation();
    // this.tourService.getCountryByCode(code).subscribe((data)=>{
    //   if(data){
    //     const countrieInfo = data.countrieData;
    //     console.log('countryInfo', countrieInfo);
    //     this.location = {lat: countrieInfo.latlng[0], lng: countrieInfo.latlng[1]};
    //     this.weatherData = data.weatherData;
    //     this.showModal = true;
    //   }
    // });
  }
}
