import { Component, OnInit } from '@angular/core';
import { PerformanceBySectorService } from './performance-by-sector.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-performance-by-sector',
  templateUrl: './performance-by-sector.component.html',
  styleUrl: './performance-by-sector.component.css',
})
export class PerformanceBySectorComponent implements OnInit {
  // chart.js
  perfSectorChart: any;

  constructor(private performanceBySectorService: PerformanceBySectorService) {}

  ngOnInit(): void {
    this.performanceBySectorService.getPerformanceBySectorData();
    this.getPerformanceSectorChart();
  }

  getPerformanceSectorChart(): Chart {
    return this.performanceBySectorService.performanceSectorChart;
  }
}
