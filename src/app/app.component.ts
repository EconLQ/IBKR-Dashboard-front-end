import { Component, OnInit } from '@angular/core';
import { Position } from './position';
import { HttpErrorResponse } from '@angular/common/http';
import { PositionService } from './position.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditPositionModalComponent } from './edit-position-modal/edit-position-modal.component';
import { DeletePositionModalComponent } from './delete-position-modal/delete-position-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Interactive Brokers Dashboard Client';
  public positions: Position[] = [];

  constructor(
    private positionService: PositionService,
    private modalService: NgbModal
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  ngOnInit(): void {
    this.getPositions();
  }

  public getPositions(): void {
    this.positionService.getPositions().subscribe(
      (response: Position[]) => {
        // update positions from response
        this.positions = response;

        for (let position of this.positions) {
          const date = position.date as any; // parse date object
          console.log(date);

          // set date to a custom format
          position.date = `${date['year']}-${
            date['monthValue']
          }-${this.timeDateValidator(
            date['dayOfMonth']
          )}T${this.timeDateValidator(date['hour'])}:${this.timeDateValidator(
            date['minute']
          )}:${this.timeDateValidator(date['second'])}`;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * Custom date and time validator for values less than 10
   * @param value date or time value
   * @returns a string with appends 0 if value < 10
   */
  private timeDateValidator(value: number): String {
    return value < 10 ? '0' + value : value.toString();
  }

  public onOpenModal(position: Position, mode: String): void {
    let modalReference;
    if (mode === 'edit') {
      modalReference = this.modalService.open(EditPositionModalComponent);
    } else if (mode === 'delete') {
      modalReference = this.modalService.open(DeletePositionModalComponent);
    }
    // set the data for a model
    modalReference!.componentInstance.position = position;
  }
}
