import { Component, Input, OnInit } from '@angular/core';
import { Position } from '../position';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../position.service';
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
    // create new JSON object by appending contractId to editForm.value for valid request
    const formWithContractId = {
      contractId: this.position.contractId,
      ...editForm.value,
    };

    console.log('Passed JSON object: ', formWithContractId);

    this.positionService
      .updatePosition(this.position.contractId, formWithContractId)
      .subscribe(
        (response: Position) => {
          console.log(response);
          this.positionService.getPositions();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
}
