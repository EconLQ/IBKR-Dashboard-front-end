import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject(false);
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpService: HttpClient, private router: Router) {}

  loggedIn() {
    this.isLoggedIn.next(true);
  }

  loggedOut() {
    this.isLoggedIn.next(false);
    // get JWT token from local storage
    const token = localStorage.getItem('token');
    this.httpService.post(`${this.apiServerUrl}/logout`, { token }).subscribe(
      (response) => {
        // remove token on succesfull (200) request
        localStorage.removeItem('token');
        console.log('Logged out...', response);
        this.router.navigate(['/login']); // redirect to login
      },
      (error) => {
        console.log('Error with logged out response:', error);
      }
    );
  }
}
