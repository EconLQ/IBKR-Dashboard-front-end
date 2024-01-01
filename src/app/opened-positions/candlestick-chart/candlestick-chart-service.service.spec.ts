import { TestBed } from '@angular/core/testing';

import { CandlestickChartServiceService } from './candlestick-chart-service.service';

describe('CandlestickChartServiceService', () => {
  let service: CandlestickChartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandlestickChartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
