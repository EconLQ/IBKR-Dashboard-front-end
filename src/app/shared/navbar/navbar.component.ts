import { Component, Input, OnDestroy } from '@angular/core';
import { PositionService } from '../../positions-table/position.service';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  private subscription: Subscription;

  constructor(private navbarService: NavbarService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  /**
   * Beneficial for performance to unusubscribe from the subcription when the component is destroyed
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
