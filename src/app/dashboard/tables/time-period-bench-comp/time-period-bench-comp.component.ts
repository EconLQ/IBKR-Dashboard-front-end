import { Component, OnInit } from '@angular/core';
import { TimePeriodBenchCompService } from './time-period-bench-comp.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-time-period-bench-comp',
  templateUrl: './time-period-bench-comp.component.html',
  styleUrl: './time-period-bench-comp.component.css',
})
export class TimePeriodBenchCompComponent implements OnInit {
  timePeriodBenchCompChart: any;

  constructor(private timePeriodBenchCompService: TimePeriodBenchCompService) {}

  ngOnInit(): void {
    this.timePeriodBenchCompService.getTimePeriodBenchCompData();
    this.getTimePeriodBenchCompChart();
  }

  getTimePeriodBenchCompChart(): Chart {
    return this.timePeriodBenchCompService.timePeriodBenchCompChart;
  }
}
