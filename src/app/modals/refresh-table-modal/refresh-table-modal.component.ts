import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefreshTableService } from './refresh-table.service';

@Component({
  selector: 'app-refresh-table-modal',
  templateUrl: './refresh-table-modal.component.html',
  styleUrl: './refresh-table-modal.component.css',
})
export class RefreshTableModalComponent {
  clicked: boolean = false; // for Refresh button in the modal 
  applicationUrl: string = environment.applicationUrl;

  constructor(
    public activeModal: NgbActiveModal,
    private refreshTableService: RefreshTableService
  ) {}

  /**
   * speaks to a back-end client (servlet) which start application on GET request
   */
  public requestPositionsFromServlet(): void {
    this.refreshTableService.updatePositionsTable();
  }
}
