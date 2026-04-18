import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { ITour } from '../../models/interfaces';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgClass, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent {
  private userService = inject(UserService);
  tour: ITour = this.userService.getTour();
  name: string = '';
  surName: string = '';
  email: string = '';

  onInitOrder() {}
}
