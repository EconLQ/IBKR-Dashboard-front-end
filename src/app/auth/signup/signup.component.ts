import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NavbarService } from '../../shared/navbar/navbar.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { User } from '../login/user';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  private apiServerUrl = environment.apiBaseUrl;
  userExists: boolean = false;
  constructor(
    private navbarService: NavbarService,
    private httpService: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navbarService.hide();
  }
  ngOnDestroy(): void {
    this.navbarService.destroy();
  }

  signUp(signUpForm: NgForm): void {
    this.userExists = false;
    const user = {
      ...signUpForm.value,
    };
    console.log('New User: ', user);

    this.httpService.post<User>(`${this.apiServerUrl}/sign-up`, user).subscribe(
      (response) => {
        console.log('Response: ', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error.status == 409) {
          console.log('Error receiving response', error.status);
          this.userExists = true;
        }
      }
    );
  }
}
