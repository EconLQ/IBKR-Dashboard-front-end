import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PositionService } from './position.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditPositionModalComponent } from './edit-position-modal/edit-position-modal.component';
import { DeletePositionModalComponent } from './delete-position-modal/delete-position-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, EditPositionModalComponent, DeletePositionModalComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FormsModule],
  providers: [PositionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
