import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RegionItem } from './region-item';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private dashboardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dashboardEndpoint}/allocation-performance-region`;

  // chart
  regionChart: any;

  // table's dataset
  regions: string[] = [];
  endingNavArray: number[] = [];
  tableData: RegionItem[] = [];
  totalEndingNav: number = 0;
  constructor(private httpClient: HttpClient) {}

  getRegionData() {
    this.httpClient.get<Observable<RegionItem[]>>(this.tableEndpoint).subscribe(
      (response: Observable<RegionItem[]>) => {
        this.tableData = response as any;

        this.buildRegionDataset();
        this.createRegionChart();
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  buildRegionDataset() {
    this.tableData.forEach((row) => {
      if (row) {
        this.regions.push(row.region);
        this.endingNavArray.push(row.endingNav as number);
        this.totalEndingNav += row.endingNav as number;
      }
    });
  }

  createRegionChart(): Chart {
    this.regionChart = new Chart('regionChart', {
      type: 'doughnut',
      data: {
        labels: this.regions,
        datasets: [
          {
            label: 'Allocation by Region',
            data: this.endingNavArray,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Allocation by Region',
            font: {
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
          },
          datalabels: {
            rotation: 35,
            display: true,
            color: '#000',
            align: 'start',
            anchor: 'end',
            formatter: (value) => {
              return (
                Number(((value as number) / this.totalEndingNav) * 100).toFixed(
                  2
                ) + '%'
              );
            },
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
    return this.regionChart;
  }
}
