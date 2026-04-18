import { Component, OnInit, inject } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ITour } from '../../models/interfaces';
import { MatCardModule } from '@angular/material/card';
import { NgxMasonryModule } from 'ngx-masonry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, NgxMasonryModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})
export class ToursComponent implements OnInit {
  private tourService = inject(ToursService);
  private router = inject(Router);
  tours: Array<ITour>;

  ngOnInit(): void {
    this.tourService.getTours().subscribe((data) => {
      this.tours = data.tours;
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
}
