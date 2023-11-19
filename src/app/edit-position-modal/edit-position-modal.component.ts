import { Component, Input, OnInit } from '@angular/core';
import { Position } from '../positions-table/position';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../positions-table/position.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-position-modal',
  templateUrl: './edit-position-modal.component.html',
  styleUrl: './edit-position-modal.component.css',
})
export class EditPositionModalComponent {
  @Input() position!: Position;
  constructor(
    public activeModal: NgbActiveModal,
    private positionService: PositionService
  ) {}

  public updatePosition(editForm: NgForm): void {
    // create new JSON object with updated position, un/realizedPnL fields
    const updatedForm = {
      contractId: this.position.contractId,
      ticker: this.position.ticker,
      date: this.position.date,
      ...editForm.value,
      averageCost: this.position.averageCost,
      lastMarketPrice: this.position.lastMarketPrice,
    };

    console.log('Passed JSON object: ', updatedForm);

    this.positionService
      .updatePosition(this.position.contractId, updatedForm)
      .subscribe(
        (response: Position) => {
          console.log(response);
          this.positionService.getPositions();
        },
        // TODO: handle error properly
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
