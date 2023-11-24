import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  showNavbar: BehaviorSubject<boolean>;

  constructor() {
    this.showNavbar = new BehaviorSubject(true);
  }

  public hide() {
    this.showNavbar.next(false);
  }

  public destroy() {
    this.showNavbar.next(true);
  }
}
