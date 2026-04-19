import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { LoaderService } from '../services/api/loader-api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    LoaderComponent,
    AsyncPipe,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private loaderService = inject(LoaderService);
  loaderStatus$ = this.loaderService.loader$;
}
