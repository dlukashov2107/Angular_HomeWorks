import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITour } from '../../models/interfaces';
import { ToursService } from '../../services/tours.service';
import { UserService } from '../../services/user.service';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  tourId: string = null;
  tour: ITour;
  userForm: FormGroup;
  private tourService = inject(ToursService);
  private userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  //private router = inject(Router);

  ngOnInit(): void {
    console.log('initOrder', this.route.snapshot.paramMap.get('id'));
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour) => {
      this.tour = tour.tour;
      console.log('tourOrder', tour);
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', { validators: Validators.required }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      cardNumber: new FormControl(''),
      birthDate: new FormControl(''),
      age: new FormControl(''),
      citizenship: new FormControl(''),
    });
  }

  initOrder(ev: Event): void {
    const userLogin = this.userService.getUser();
    const personalData = this.userForm.getRawValue();
    const postObj = {
      userLogin: userLogin,
      tourId: this.tourId,
      personalData: [personalData],
    };
    this.tourService.postOrder(postObj).subscribe();
  }
}

// import { Component, inject } from '@angular/core';
// import { MatCardModule } from '@angular/material/card';
// import { UserService } from '../../services/user.service';
// import { ITour } from '../../models/interfaces';
// import { NgClass } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-order',
//   imports: [MatCardModule, NgClass, FormsModule],
//   templateUrl: './order.component.html',
//   styleUrl: './order.component.scss',
// })
// export class OrderComponent {
//   private userService = inject(UserService);
//   tour: ITour = this.userService.getTour();
//   name: string = '';
//   surName: string = '';
//   email: string = '';

//   onInitOrder() {}
// }
