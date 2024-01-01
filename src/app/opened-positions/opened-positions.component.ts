import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment.development';
import { Position } from '../positions-table/position';
import { PositionService } from '../positions-table/position.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ClosePositionComponent } from '../modals/close-position/close-position.component';
import { RefreshTableModalComponent } from '../modals/refresh-table-modal/refresh-table-modal.component';
import { AddToPositionComponent } from '../modals/add-to-position/add-to-position.component';
import { CandlestickChartServiceService } from './candlestick-chart/candlestick-chart-service.service';

@Component({
  selector: 'app-opened-positions',
  templateUrl: './opened-positions.component.html',
  styleUrl: './opened-positions.component.css',
})
export class OpenedPositionsComponent {
  private twChartId: string = 'chart'; // TW chart id
  public positions: Position[] = [];
  public isPositionsRoute: boolean = false;
  applicationUrl = environment.applicationUrl;
  isRefreshed: boolean = false;
  updateOn = sessionStorage.getItem('lastPositionUpdateDateTime');

  constructor(
    private positionService: PositionService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private candleStickChartService: CandlestickChartServiceService
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
    // TODO: think how to show the char for each graph
    // obviously that positions array is empty because of getPositions() async nature
    // this.candleStickChartService.getChartData('URA', 'URA');
  }

  public getPositions(): void {
    this.positionService.getPositions().subscribe(
      (response: Position[]) => {
        for (let position of response) {
          if (position.position != 0) {
            const date = position.date as any; // parse date object

            // set date to a custom format
            position.date = `${date['year']}-${
              date['monthValue']
            }-${this.timeDateValidator(
              date['dayOfMonth']
            )}T${this.timeDateValidator(date['hour'])}:${this.timeDateValidator(
              date['minute']
            )}:${this.timeDateValidator(date['second'])}`;

            this.positions.push(position);
          }
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
    if (mode === 'close') {
      modalReference = this.modalService.open(ClosePositionComponent);
    } else if (mode === 'add') {
      modalReference = this.modalService.open(AddToPositionComponent);
    }
    // set the data for a model
    modalReference!.componentInstance.position = position;
  }

  public refreshModal() {
    this.modalService.open(RefreshTableModalComponent);
  }

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
  /**
   * Builds tradingview chart
   */
  renderChart(ticker: string) {
    this.candleStickChartService.getChartData(ticker, this.twChartId);
  }
}
