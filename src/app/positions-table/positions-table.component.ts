import { Position } from './position';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeletePositionModalComponent } from '../modals/delete-position-modal/delete-position-modal.component';
import { EditPositionModalComponent } from '../modals/edit-position-modal/edit-position-modal.component';
import { PositionService } from './position.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { RefreshTableModalComponent } from '../modals/refresh-table-modal/refresh-table-modal.component';

@Component({
  selector: 'app-positions-table',
  templateUrl: './positions-table.component.html',
  styleUrl: './positions-table.component.css',
})
export class PositionsTableComponent {
  public positions: Position[] = [];
  public isPositionsRoute: boolean = false;
  applicationUrl = environment.applicationUrl;
  isRefreshed: boolean = false;

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private httpClient: HttpClient
  ) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  ngOnInit(): void {
    this.getPositions();
    // subscribe to route changes
    this.route.url.subscribe((segments) => {
      this.isPositionsRoute = segments[0]?.path == 'positions';
    });
  }

  public getPositions(): void {
    this.positionService.getPositions().subscribe(
      (response: Position[]) => {
        // update positions from response
        this.positions = response;

        for (let position of this.positions) {
          const date = position.date as any; // parse date object

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

  public refreshModal() {
    this.modalService.open(RefreshTableModalComponent);
  }
  /**
   * Performs search for positions on front-end according to the passed key
   * @param key position's date in format (yyyy-MM-DD) or ticker
   */
  public searchPositions(key: String): void {
    const result: Position[] = [];
    for (const position of this.positions) {
      const positionDate: String = position.date as String;
      // parse string till the time value
      const dateKeyToMatch = positionDate.substring(0, 10);

      if (
        position.ticker.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        dateKeyToMatch.indexOf(key.toLowerCase()) != -1
      ) {
        result.push(position);
      }
    }
    // reassign position to the result array
    this.positions = result;

    if (result.length === 0 || !key) {
      this.getPositions();
    }
  }
}
