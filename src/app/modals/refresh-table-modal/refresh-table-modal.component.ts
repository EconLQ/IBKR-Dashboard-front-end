import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-refresh-table-modal',
  templateUrl: './refresh-table-modal.component.html',
  styleUrl: './refresh-table-modal.component.css',
})
export class RefreshTableModalComponent {
  applicationUrl: string = environment.applicationUrl;

  constructor(
    public activeModal: NgbActiveModal,
    private httpClient: HttpClient
  ) {}

  /**
   * speaks to a back-end client (servlet) which start application on GET request
   */
  requestPositionsFromServlet(): void {
    this.httpClient.get(`${this.applicationUrl}/app-servlet`).subscribe(
      (response) => {
        console.log('Positions fetched succesfully...', response);
      },
      (error) => {
        if (error.status == 200) {
          console.log('Positions fetched...');
        } else {
          console.error('Error fetching position', error);
        }
      }
    );

    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
}
