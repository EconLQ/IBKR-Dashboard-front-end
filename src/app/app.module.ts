import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PositionService } from './positions-table/position.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPositionModalComponent } from './edit-position-modal/edit-position-modal.component';
import { DeletePositionModalComponent } from './delete-position-modal/delete-position-modal.component';
import { FormsModule } from '@angular/forms';
import { PositionsTableComponent } from './positions-table/positions-table.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EditPositionModalComponent,
    DeletePositionModalComponent,
    PositionsTableComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [PositionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
