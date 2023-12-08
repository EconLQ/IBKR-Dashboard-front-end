import { Component, OnInit } from '@angular/core';
import { HistoricalPerfBenchCompService } from './hist-perf-bench-comp.service';

@Component({
  selector: 'app-hist-perf-bench-comp',
  templateUrl: './hist-perf-bench-comp.component.html',
  styleUrl: './hist-perf-bench-comp.component.css',
})
export class HistPerfBenchCompComponent implements OnInit {
  // chart.js
  histChart: any;

  constructor(
    private historicalPerfBenchCompService: HistoricalPerfBenchCompService
  ) {}

  ngOnInit(): void {
    this.historicalPerfBenchCompService.getHistPerfBenchCompData();
    this.getHistPerfBechChart();
  }

  getHistPerfBechChart() {
    this.historicalPerfBenchCompService.histPerfBenchCompChart;
  }
}
