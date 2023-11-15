import { Component, OnInit } from '@angular/core';
import { Position } from './position';
import { HttpErrorResponse } from '@angular/common/http';
import { PositionService } from './position.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

          // set date to a custom format
          position.date = `${date['year']}-${date['monthValue']}-${
            date['dayOfMonth'] < 10
              ? '0' + date['dayOfMonth']
              : date['dayOfMonth']
          }`;
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(position: Position, mode: String): void {
    // set the position data
    const selectedPositon = position;
    const selectedMode = mode;
    // get table
    const table = document.getElementById('main-container');
    // create button
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addPositionModal');
    }

    if (mode === 'edit') {
      button.setAttribute('data-target', '#editPositionModal');
    }

    if (mode === 'delete') {
      button.setAttribute('data-target', '#deletePositionModal');
    }

    table?.appendChild(button);
    button.click();

    // open the modal
    const modal = document.getElementById('editPositionModal');
    const modalInstance = this.modalService.open(modal);
    // modalInstance.show();
  }
}
