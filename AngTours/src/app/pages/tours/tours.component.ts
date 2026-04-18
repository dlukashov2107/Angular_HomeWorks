import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ITour } from '../../models/interfaces';
import { MatCardModule } from '@angular/material/card';
import { NgxMasonryModule } from 'ngx-masonry';
import { Router } from '@angular/router';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive'

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, NgxMasonryModule, HighlightActiveDirective],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToursComponent implements OnInit {
  private tourService = inject(ToursService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  tours: Array<ITour>;

  ngOnInit(): void {
    this.tourService.getTours().subscribe((data) => {
      //  console.log('data tours all', data.tours);
      this.tours = data.tours;
      this.cdr.detectChanges();
      console.log('this.tours all', this.tours);
    });
  }

  goToTour(tour: ITour): void {
    if (tour.id) {
      this.router.navigate([`tour/${tour.id}`]);
    } else {
      console.error('id не найден');
    }
  }

  sort(item1: HTMLElement, item2: HTMLElement): number {
    if(parseFloat(item1.style.top) == parseFloat(item2.style.top))
    {
      return parseFloat(item1.style.left) < parseFloat(item2.style.left) ? -1 : 1;
    }
    else 
      {
        return parseFloat(item1.style.top) - parseFloat(item2.style.top)
      }
  }

  onEnter(ev: {el: HTMLElement, index: number}){
    const tourId = ev.el.getAttribute('data-tour-id');
    const num = tourId;
    if(tourId)
    {
      //this.goToTour(this.tours.find(item => item.id === num as unknown as number));
      this.goToTour({id: tourId} as unknown as ITour);
    }
    else
    {
      console.log("id не найден");
    }
  }
}
