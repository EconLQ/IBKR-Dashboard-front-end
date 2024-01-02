import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RefreshTableService } from './refresh-table.service';
import { Subscription } from 'rxjs';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-refresh-table-modal',
  templateUrl: './refresh-table-modal.component.html',
  styleUrl: './refresh-table-modal.component.css',
})
export class RefreshTableModalComponent {
  clicked: boolean = false; // for Refresh button in the modal
  applicationUrl: string = environment.applicationUrl;
  private updatePositionsTableSubscription: Subscription | null = null;
  lastPositionUpdateDateTime: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private refreshTableService: RefreshTableService
  ) {}

  ngOnDestroy(): void {
    if (this.updatePositionsTableSubscription) {
      this.updatePositionsTableSubscription.unsubscribe();
    }
  }
  /**
   * speaks to a back-end client (servlet) which start application on GET request
   */
  public requestPositionsFromServlet(): void {
    this.updatePositionsTableSubscription = this.refreshTableService
      .updatePositionsTable()
      .subscribe(
        () => {
          console.log(
            '[requestPositionsFromServlet] Got response from the server...'
          );
        },
        (error: HttpErrorResponse) => {
          console.log('[requestPositionsFromServlet] error', error);
        }
      );
  }
}
