import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimePeriodBenchCompItem } from './time-period-bench-comp-item';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class TimePeriodBenchCompService {
  private dashboardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dashboardEndpoint}/time-period-bench-comp`;

  // chart
  timePeriodBenchCompChart: any;
  // chart's dataset
  timePeriodBenchCompChartDataset: Array<number[]> = [];
  // dates (for chart labels)
  dates: string[] = [];
  // table's data
  tableData: TimePeriodBenchCompItem[] = [];

  constructor(private httpClient: HttpClient) {}

  getTimePeriodBenchCompData() {
    this.httpClient
      .get<Observable<TimePeriodBenchCompItem[]>>(this.tableEndpoint)
      .subscribe(
        (response: Observable<TimePeriodBenchCompItem[]>) => {
          this.tableData = response as any;

          this.buildTimePeriodBenchCompDataset();
          this.createTimePeriodBenchCompChart();
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }

  buildTimePeriodBenchCompDataset() {
    let spxtrArr: number[] = [];
    let efaArr: number[] = [];
    let vtArr: number[] = [];
    let accountArr: number[] = [];

    // fill each array with a corresponding data
    this.tableData.forEach((row) => {
      if (row) {
        this.dates.push(row.date);
        spxtrArr.push(row.spxtr);
        efaArr.push(row.efa);
        vtArr.push(row.vt);
        accountArr.push(row.account);
      }
    });

    // built dataset
    this.timePeriodBenchCompChartDataset.push(
      spxtrArr,
      efaArr,
      vtArr,
      accountArr
    );
  }
  createTimePeriodBenchCompChart(): Chart {
    this.timePeriodBenchCompChart = new Chart('timePeriodBenchCompChart', {
      type: 'bar',
      data: {
        labels: this.dates,
        datasets: [
          {
            label: 'SPXTR',
            data: this.timePeriodBenchCompChartDataset[0],
            backgroundColor: 'yellow',
          },
          {
            label: 'EFA',
            data: this.timePeriodBenchCompChartDataset[1],
            backgroundColor: 'green',
          },
          {
            label: 'VT',
            data: this.timePeriodBenchCompChartDataset[2],
            backgroundColor: 'orange',
          },
          {
            label: 'Account',
            data: this.timePeriodBenchCompChartDataset[3],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Time Period Benchmark Comparison with ETFs',
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
    return this.timePeriodBenchCompChart;
  }
}
