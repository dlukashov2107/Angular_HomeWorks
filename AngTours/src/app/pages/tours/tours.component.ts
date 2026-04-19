import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ITour } from '../../models/interfaces';
import { MatCardModule } from '@angular/material/card';
import {
  NgxMasonryComponent,
  NgxMasonryModule,
  NgxMasonryOptions,
} from 'ngx-masonry';
import { Router } from '@angular/router';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tours',
  imports: [
    MatCardModule,
    NgxMasonryModule,
    HighlightActiveDirective,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToursComponent implements OnInit, AfterViewInit {
  @ViewChild('highLightDirective', { read: HighlightActiveDirective })
  highLightDirective: HighlightActiveDirective;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  private tourService = inject(ToursService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  tours: Array<ITour>;
  toursCopy: Array<ITour>;
  masonryOptions: NgxMasonryOptions = { animations: {} };

  ngOnInit(): void {
    this.tourService.getTours().subscribe((data) => {
      //  console.log('data tours all', data.tours);
      this.tours = data.tours;
      this.toursCopy = [...this.tours];
      this.cdr.detectChanges();
      console.log('this.tours all', this.tours);
    });
  }
  ngAfterViewInit() {}

  goToTour(tour: ITour): void {
    if (tour.id) {
      this.router.navigate([`tour/${tour.id}`]);
    } else {
      console.error('id не найден');
    }
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

  searchTours(ev: Event): void {
    console.log('searching');

    const searchValue = (ev.target as HTMLInputElement).value;
    const regExp = new RegExp(searchValue, 'i');

    if (!searchValue) {
      this.tours = [...this.toursCopy];
    } else {
      this.tours = this.toursCopy.filter((el) => {
        return regExp.test(el.name);
      });
    }
    setTimeout(() => {
      //this.showMasonry = true;
      this.masonry.reloadItems();
      this.masonry.layout();
    });
  }

  updateView(): void {
    setTimeout(() => {
      this.highLightDirective.initItems();
    });
  }
}
