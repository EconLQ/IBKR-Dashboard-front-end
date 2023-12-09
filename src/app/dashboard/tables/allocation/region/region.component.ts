import { Component, OnInit } from '@angular/core';
import { RegionService } from './region.service';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrl: './region.component.css',
})
export class RegionComponent implements OnInit {
  // chart.js
  regionChart: any;

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.regionService.getRegionData();
    this.getRegionChart();
  }
  
  getRegionChart() {
    return this.regionService.regionChart;
  }
}
