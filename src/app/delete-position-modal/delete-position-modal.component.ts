import { Component, Input } from '@angular/core';
import { Position } from '../positions-table/position';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../positions-table/position.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-position-modal',
  templateUrl: './delete-position-modal.component.html',
  styleUrl: './delete-position-modal.component.css',
})
export class DeletePositionModalComponent {
  @Input() position!: Position;

  constructor(
    public activeModal: NgbActiveModal,
    public positionService: PositionService
  ) {}

  private closeModal(): void {
    this.activeModal.dismiss('Close');
  }

  public deletePosition(): void {
    this.positionService.deletePosition(this.position.contractId).subscribe(
      (response: void) => {
        console.log('Deleted Position...', response);
        this.positionService.getPositions();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    // close the modal after succesfull DELETE request
    this.activeModal.close();
  }
}
