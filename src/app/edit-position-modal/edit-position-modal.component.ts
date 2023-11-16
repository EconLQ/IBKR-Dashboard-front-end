import { Component, Input } from '@angular/core';
import { Position } from '../position';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-position-modal',
  templateUrl: './edit-position-modal.component.html',
  styleUrl: './edit-position-modal.component.css',
})
export class EditPositionModalComponent {
  @Input() position!: Position;

  constructor(public activeModal: NgbActiveModal) {}
}
