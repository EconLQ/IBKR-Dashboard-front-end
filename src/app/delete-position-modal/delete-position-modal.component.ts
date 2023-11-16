import { Component, Input } from '@angular/core';
import { Position } from '../position';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-position-modal',
  templateUrl: './delete-position-modal.component.html',
  styleUrl: './delete-position-modal.component.css',
})
export class DeletePositionModalComponent {
  @Input() position!: Position;

  constructor(public activeModal: NgbActiveModal) {}
}
