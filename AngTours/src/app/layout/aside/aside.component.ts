import { Component, inject } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToursService } from '../../services/tours.service';
import { IFilterTypeLogic, ITourTypes } from '../../models/interfaces';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';

@Component({
  selector: 'app-aside',
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './aside.component.html',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  styleUrl: './aside.component.scss',
})
export class AsideComponent {
  selectedType: ITourTypes = 'all';
  tourService = inject(ToursService);
  selectedDate: any;

  tourTypes: IFilterTypeLogic[] = [
    { key: 'single', label: 'Одиночный' },
    { key: 'group', label: 'Групповой' },
    { key: 'all', label: 'Все' },
  ];
  changeTourType(ev: MatSelectChange): void {
    // console.log('ev', ev);
    this.tourService.setTourType(ev.value);
  }
  changeTourDate(ev: any): void {
    // console.log("full date: ", ev);
    //  let baseDate = ev.value.toLocaleDateString();

    //  let finDate =baseDate.slice(3,5) + "-" + baseDate.slice(0,2) + "-" + baseDate.slice(6,10);
    //  this.tourService.setTourDate(finDate);
    this.tourService.setTourDate(ev.value.toISOString());
    //console.log("date: ", ev.value.toISOString())
    //  console.log("ffinDate: ", finDate);
  }
}
