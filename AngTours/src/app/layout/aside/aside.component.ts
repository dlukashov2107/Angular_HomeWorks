import { Component, inject } from '@angular/core';
import {MatSelectChange, MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToursService } from '../../services/tours.service';
import { IFilterTypeLogic, ITourTypes } from '../../models/interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter} from '@angular/material/core'

@Component({
  selector: 'app-aside',
  imports: [MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
  templateUrl: './aside.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './aside.component.scss'
})
export class AsideComponent {
  selectedType: ITourTypes = 'all';
  tourService = inject(ToursService);
  selectedDate: any;

  tourTypes: IFilterTypeLogic[]= [
    {key: 'single', label: 'Одиночный'},
    {key: 'group', label: 'Групповой'},
    {key: 'all', label: 'Все'}
  ]
  changeTourType(ev: MatSelectChange): void{
    // console.log('ev', ev);
    this.tourService.setTourType(ev.value);
  }
  changeTourDate(ev:any): void{
    let date = ev.value.getFullYear()+"-"+(ev.value.getMonth() + 1)+"-"+ev.value.getDate(); 
    this.tourService.setTourDate(date);
  }
}
