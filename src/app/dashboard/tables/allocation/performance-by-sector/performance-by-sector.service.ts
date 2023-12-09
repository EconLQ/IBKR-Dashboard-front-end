import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, throttleTime } from 'rxjs';
import { PerformanceBySectorItem } from './performance-by-sector-item';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class PerformanceBySectorService {
  private dasboardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dasboardEndpoint}/allocation-performance-sector`;

  // chart
  performanceSectorChart: any;

  // table's data
  tableData: PerformanceBySectorItem[] = [];
  // chart's dataset (store's endingNav USD and % values)
  performanceSectorChartDataset: Array<number[]> = [];
  sectors: string[] = [];

  constructor(private httpClient: HttpClient) {}

  getPerformanceBySectorData() {
    this.httpClient
      .get<Observable<PerformanceBySectorItem[]>>(this.tableEndpoint)
      .subscribe(
        (response: Observable<PerformanceBySectorItem[]>) => {
          this.tableData = response as any;

          this.buildPerformanceBySectorDataset();
          this.createPerformanceBySectorChart();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  buildPerformanceBySectorDataset() {
    let endingNavUsdArr: number[] = [];
    let endingNavPctArr: number[] = [];

    // build USD and %-ile values arrays
    this.tableData.forEach((row) => {
      this.sectors.push(row.sector);
      endingNavUsdArr.push(row.endingNavUsd);
      endingNavPctArr.push(row.endingNavPct);
    });

    // add them to the dataset
    this.performanceSectorChartDataset.push(endingNavUsdArr, endingNavPctArr);
  }

  createPerformanceBySectorChart(): Chart {
    this.performanceSectorChart = new Chart('performanceSectorChart', {
      type: 'bar',
      data: {
        labels: this.sectors,
        datasets: [
          {
            label: 'Allocation and Performance by Sector',
            data: this.performanceSectorChartDataset[0],
            backgroundColor: this.checkZeroValue,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Allocation and Performance by Sector',
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
    return this.performanceSectorChart;
  }

  checkZeroValue(context: any): string {
    const index: number = context.dataIndex;
    const value = context.dataset.data[index];
    if (typeof value == 'number') {
      return value < 0 ? 'red' : 'green';
    } else {
      return 'red';
    }
  }
}
