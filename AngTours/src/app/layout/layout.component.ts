import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, HeaderComponent, FooterComponent, AsideComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
