import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Position } from '../../positions-table/position';
import { PositionService } from '../../positions-table/position.service';

@Component({
  selector: 'app-add-to-position',
  templateUrl: './add-to-position.component.html',
  styleUrl: './add-to-position.component.css',
})
export class AddToPositionComponent {
  @Input() position!: Position;

  constructor(
    public activeModal: NgbActiveModal,
    private positionService: PositionService
  ) {}

  addToPosition(addToPositionForm: NgForm) {
    // get new position size
    const size = addToPositionForm.value.position;

    // set updated position size
    this.position.position = size;

    this.positionService.addToPosition(this.position).subscribe(
      (response) => {
        console.log('Add To position response: ', response);
      },
      (error) => {
        console.log('Error [addToPosition]', error);
      }
    );
  }
}
