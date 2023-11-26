import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  /**
   * Checks whether the user is logged in by looking for token in local storage
   * @returns true if token is present is local storage
   */
  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // check if a token is present in the local storage
    const token = localStorage.getItem('token');
    if (token !== null) {
      return true;
    }
    return false;
  }
}
