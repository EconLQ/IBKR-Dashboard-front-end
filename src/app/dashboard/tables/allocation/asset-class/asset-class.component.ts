import { Component, OnInit } from '@angular/core';
import { AssetClassService } from './asset-class.service';

@Component({
  selector: 'app-asset-class',
  templateUrl: './asset-class.component.html',
  styleUrl: './asset-class.component.css',
})
export class AssetClassComponent implements OnInit {
  // chart.js
  assetClass: any;

  constructor(private assetClassService: AssetClassService) {}

  ngOnInit(): void {
    this.assetClassService.getAssetClassData();
    this.getAssetClassChart();
  }

  getAssetClassChart() {
    this.assetClassService.assetClassChart;
  }
}
