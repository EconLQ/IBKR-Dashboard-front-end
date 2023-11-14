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
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
