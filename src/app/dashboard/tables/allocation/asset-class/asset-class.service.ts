import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AssetClassItem } from './asset-class-item';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class AssetClassService {
  private dashboardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dashboardEndpoint}/allocation-asset-class`;

  constructor(private httpClient: HttpClient) {}

  // chart
  assetClassChart: any;
  // table's dataset
  assetClassChartDataset: Array<number[]> = [];

  // table's data
  tableData: AssetClassItem[] = [];

  getAssetClassData() {
    this.httpClient
      .get<Observable<AssetClassItem[]>>(this.tableEndpoint)
      .subscribe(
        (response: Observable<AssetClassItem[]>) => {
          console.log('AssetClass', response as any);
          this.tableData = response as any;

          this.buildAssetClassDataset();
          this.createAssetClassChart();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  buildAssetClassDataset() {
    let etfsDataset: number[] = [];
    let stockDataset: number[] = [];
    let cashDataset: number[] = [];

    // fill each value to appropriate dataset
    this.tableData.forEach((row) => {
      etfsDataset.push(row.etfs);
      stockDataset.push(row.stocks);
      cashDataset.push(row.cash);
    });

    // form main dataset
    this.assetClassChartDataset.push(etfsDataset, stockDataset, cashDataset);
  }

  createAssetClassChart(): Chart {
    this.assetClassChart = new Chart('assetClassChart', {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'ETFs',
            data: this.assetClassChartDataset[0],
            backgroundColor: 'yellow',
          },
          {
            label: 'Stocks',
            data: this.assetClassChartDataset[1],
            backgroundColor: 'green',
          },
          {
            label: 'Cash',
            data: this.assetClassChartDataset[2],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Allocation by Asset Class',
            font: {
              size: 16,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
    return this.assetClassChart;
  }
}
