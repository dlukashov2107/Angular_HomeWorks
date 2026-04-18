import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnChanges {
  @Input() items: any[]=[];
  @Input() label: string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes", changes)
  }
}
