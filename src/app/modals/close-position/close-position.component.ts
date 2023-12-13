import { Component, Input } from '@angular/core';
import { Position } from '../../positions-table/position';
import { PositionService } from '../../positions-table/position.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-close-position',
  templateUrl: './close-position.component.html',
  styleUrl: './close-position.component.css',
})
export class ClosePositionComponent {
  @Input() position!: Position;

  constructor(
    public activeModal: NgbActiveModal,
    private positionService: PositionService
  ) {}

  closePosition(closePositionForm: NgForm) {
    // get new position size
    const size = closePositionForm.value.position;

    // set updated position size
    this.position.position = size;

    this.positionService.closePosition(this.position).subscribe(
      (response) => {
        console.log('Close position response: ', response);
      },
      (error) => {
        console.log('Error [closePosition]', error);
      }
    );
  }
}
