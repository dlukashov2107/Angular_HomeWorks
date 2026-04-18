import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../../services/tours.service';
import { MatCardModule } from '@angular/material/card';
import { ITour } from '../../models/interfaces';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tour-item',
  imports: [MatCardModule],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss',
})
export class TourItemComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private router = inject(Router);
  private tourService = inject(ToursService);
  private userService = inject(UserService);
  tour: ITour;

  ngOnInit(): void {
    const heroId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(heroId).subscribe(
      (data) => {
        //console.log('tour, id', data, heroId);
        this.tour = data;
        console.log('Tour: ', this.tour);
      },
      (error) => {
        console.log('error', error);
      },
    );
  }
  onOrder(): void {
    if (this.tour.id) {
      this.userService.setTour(this.tour);
      this.router.navigate(['/order']);
    }
  }
}
