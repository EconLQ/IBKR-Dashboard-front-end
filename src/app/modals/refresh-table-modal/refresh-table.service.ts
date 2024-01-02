import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { ErrorModalComponent } from '../error-modal/error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class RefreshTableService {
  applicationUrl = environment.applicationUrl;
  lastPositionUpdateDateTime: string = '';

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {}

  /**
   * speaks to a back-end client (servlet) which start application on GET request
   */
  public updatePositionsTable(): Observable<void> {
    // create data object
    const date: Date = new Date();
    return this.httpClient
      .get<void>(`${this.applicationUrl}/app-servlet`, { observe: 'response' })
      .pipe(
        map((response) => {
          if (response.status == 200) {
            console.log('Response is OK. Positions fetched succesfully...');
            // set new date
            this.lastPositionUpdateDateTime = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

            // add new date to a session storage
            sessionStorage.setItem(
              'lastPositionUpdateDateTime',
              this.lastPositionUpdateDateTime
            );
            // reload the page to update values in the table
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return;
          } else if (response.status == 202) {
            console.log('Failed to connect to IB...');
            const modalRef = this.modalService.open(ErrorModalComponent);
            modalRef.componentInstance.title = 'Failed to connect to IB';
            modalRef.componentInstance.message =
              'Failed to establish connection to IB. Are you sure that TWS or IB Gateway is open?';
            return;
          } else {
            console.error('Error fetching position', response);
            throw new HttpErrorResponse({
              status: response.status,
              statusText: response.statusText,
            });
          }
        })
      );
  }
}
