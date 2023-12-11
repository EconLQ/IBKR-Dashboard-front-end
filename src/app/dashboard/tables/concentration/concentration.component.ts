import { Component, OnInit } from '@angular/core';
import { ConcentrationHoldingsService } from './concentration-service';

@Component({
  selector: 'app-concentration',
  templateUrl: './concentration.component.html',
  styleUrl: './concentration.component.css',
})
export class ConcentrationComponent implements OnInit {
  // chart
  holdingsChart: any;

  constructor(
    private concentrationHoldingsService: ConcentrationHoldingsService
  ) {}

  ngOnInit(): void {
    this.concentrationHoldingsService.getConcentrationHoldingsData();
    this.getConcentrationHoldingsChart();
  }

  getConcentrationHoldingsChart() {
    return this.concentrationHoldingsService.concentrationSectorsChart;
  }
}
