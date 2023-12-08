import { Component, OnInit } from '@angular/core';
import { RiskMeasuresBenchCompService } from './risk-measures-bench.service';

@Component({
  selector: 'app-risk-measures-bench',
  templateUrl: './risk-measures-bench.component.html',
  styleUrl: './risk-measures-bench.component.css',
})
export class RiskMeasuresBenchComponent implements OnInit {
  // Chart.js object
  chart: any;

  constructor(
    private riskMeasursBenchCompService: RiskMeasuresBenchCompService
  ) {}

  ngOnInit() {
    // request data
    this.riskMeasursBenchCompService.getRiskMeasuresBenchComp();
    // get charts
    this.getSharpeSortinoChart();
    this.getEndingVamiChart();
    this.getMaxDDChart();
  }

  getSharpeSortinoChart() {
    return this.riskMeasursBenchCompService.sharpeSortinoChart;
  }
  getEndingVamiChart() {
    return this.riskMeasursBenchCompService.endingVamiChart;
  }
  getMaxDDChart() {
    return this.riskMeasursBenchCompService.maxDDChart;
  }
}
