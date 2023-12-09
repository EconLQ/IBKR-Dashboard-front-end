import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { HistoricalPerfBenchItem } from './hisrt-perf-bench-item';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class HistoricalPerfBenchCompService {
  private dashboardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dashboardEndpoint}/hist-perf-bench-comp`;

  // chart
  histPerfBenchCompChart: any;
  // dataset
  histPerfBenchCompChartDataset: Array<number[]> = [];

  // table's data
  tableData: HistoricalPerfBenchItem[] = [];

  constructor(private httpClient: HttpClient) {}

  getHistPerfBenchCompData() {
    this.httpClient
      .get<Observable<HistoricalPerfBenchItem[]>>(this.tableEndpoint)
      .subscribe(
        (response: Observable<HistoricalPerfBenchItem[]>) => {
          console.log('getHistPerfBenchCompData', response);
          this.tableData = response as any;

          this.getHistPerformanceDataset();
          this.createHistPerfBenchChart();
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  createHistPerfBenchChart(): Chart {
    this.histPerfBenchCompChart = new Chart('histPerfBenchCompChart', {
      type: 'line',
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
            data: this.histPerfBenchCompChartDataset[0],
            label: 'SPXTR',
            borderColor: '#3e95cd',
            fill: false,
          },
          {
            data: this.histPerfBenchCompChartDataset[1],
            label: 'EFA',
            borderColor: '#8e5ea2',
            fill: false,
          },
          {
            data: this.histPerfBenchCompChartDataset[2],
            label: 'VT',
            borderColor: '#3cba9f',
            fill: false,
          },
          {
            data: this.histPerfBenchCompChartDataset[3],
            label: 'Account',
            borderColor: '#e8c3b9',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Historical Performance Benchamrk Comparison',
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
    return this.histPerfBenchCompChart;
  }

  getHistPerformanceDataset() {
    let spxtrVal: number[] = [];
    let efaVal: number[] = [];
    let vtVal: number[] = [];
    let accVal: number[] = [];

    // parse each row to get value for each measure
    this.tableData.forEach((row) => {
      spxtrVal.push(row.spxtr);
      efaVal.push(row.efa);
      vtVal.push(row.vt);
      accVal.push(row.account);
    });

    // form dataset with the corresponding values
    this.histPerfBenchCompChartDataset.push(spxtrVal, efaVal, vtVal, accVal);
    console.log('dataset', this.histPerfBenchCompChartDataset);
  }
}
