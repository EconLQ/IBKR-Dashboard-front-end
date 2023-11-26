import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PositionService } from './positions-table/position.service';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbAccordionBody,
  NgbActiveModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EditPositionModalComponent } from './edit-position-modal/edit-position-modal.component';
import { DeletePositionModalComponent } from './delete-position-modal/delete-position-modal.component';
import { FormsModule } from '@angular/forms';
import { PositionsTableComponent } from './positions-table/positions-table.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { NavbarService } from './shared/navbar/navbar.service';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    EditPositionModalComponent,
    DeletePositionModalComponent,
    PositionsTableComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [PositionService, CookieService, NgbActiveModal, NavbarService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
