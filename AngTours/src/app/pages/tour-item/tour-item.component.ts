import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../../services/tours.service';
import { MatCardModule } from '@angular/material/card';
import { ITour } from '../../models/interfaces';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-item',
  imports: [MatCardModule, CommonModule],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss',
})
export class TourItemComponent implements OnInit {
  tourId: string = null;
  tour: ITour;
  private tourService = inject(ToursService);
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour) => {
      this.tour = tour.tour;
    });
  }

  onOrder(ev: Event): void {
    this.router.navigate(['/tours/order/', this.tourId]);
  }
}
