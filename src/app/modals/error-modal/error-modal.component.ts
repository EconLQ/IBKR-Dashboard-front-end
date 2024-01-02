import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css',
})
export class ErrorModalComponent {
  title: string = '';
  message: string = '';
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
    this.title = 'Error'
    this.message =
      'Too many requests. Pelase wait for 1m to let API cooldown a bit';
  }

  closeModal() {
    this.activeModal.close();
  }
}
