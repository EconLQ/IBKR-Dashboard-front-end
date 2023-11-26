import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './user';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NavbarService } from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private apiServerUrl = environment.apiBaseUrl;
  @Input() user!: User;
  showErrorMessage = false;

  constructor(
    private httpClient: HttpClient,
    private navbarService: NavbarService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.navbarService.hide();
  }
  ngOnDestroy(): void {
    this.navbarService.destroy();
  }

  public login(loginForm: NgForm): void {
    this.showErrorMessage = false;
    const credentials = {
      ...loginForm.value,
    };
    
    // send post request to a server with packed credentials
    this.httpClient
      .post(`${this.apiServerUrl}/login`, credentials, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          console.log('Login successful:', response);
          const token = response.body.token;
          // add recieved jwt to local storage
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['/positions']);
        },
        (error) => {
          console.log('Credentials are invalid...', error);
          this.showErrorMessage = true;
        }
      );
  }

  /**
   * If credentials are wrong then asks user to sign-up
   */
  redirectToSignUp() {
    this.router.navigate(['/sign-up']);
  }
}
