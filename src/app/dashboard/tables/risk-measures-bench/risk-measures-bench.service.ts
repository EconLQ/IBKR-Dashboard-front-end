import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RiskRatioData } from './risk-ratio-data';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class RiskMeasuresBenchCompService {
  apiBaseUrl = environment.apiBaseUrl;
  dashboardBaseUrl = `${this.apiBaseUrl}/dashboard`;

  // charts
  sharpeSortinoChart: any;
  endingVamiChart: any;
  maxDDChart: any;

  // datasets
  sharpeChartDataset: number[] = [];
  sortinoChartDataset: number[] = [];
  endingVamiChartDataset: number[] = [];
  maxDDChartDataset: number[] = [];

  // all the data from the table Risk Measures Benchmark Comparison
  tableData: RiskRatioData[] = [];

  constructor(private httpClient: HttpClient) {}

  /**
   * Requests JSON format data from server via specific endpoint
   */
  getRiskMeasuresBenchComp(): void {
    this.httpClient
      .get<Observable<RiskRatioData[]>>(
        `${this.dashboardBaseUrl}/risk-measures-benchmark`
      )
      .subscribe(
        (response: Observable<RiskRatioData[]>) => {
          console.log('[RiskMeasuresBenchComponent] Response', response);
          this.tableData = response as any;

          // from dataset from tableData
          this.getComparisonDataset();

          this.createSharpeSortinoChart(); // create sharpe chart
          this.createEndingVamiChart(); // create ending vami chart
          this.createMaxDDChart(); // create max drawdown chart
        },
        (error) => {
          console.log(error);
        }
      );
  }
  /**
   * Parses each object from the table and map data to certain dataset
   */
  getComparisonDataset(): void {
    this.tableData.forEach((row) => {
      const cleanCategory = row.riskRatioCategory.replace(':', '').trim();

      if (cleanCategory == 'Sharpe Ratio') {
        this.sharpeChartDataset = [row.spxtr, row.efa, row.vt, row.account];
      } else if (cleanCategory == 'Sortino Ratio') {
        this.sortinoChartDataset = [row.spxtr, row.efa, row.vt, row.account];
      } else if (cleanCategory == 'Ending VAMI') {
        this.endingVamiChartDataset = [row.spxtr, row.efa, row.vt, row.account];
      } else if (cleanCategory == 'Max Drawdown') {
        this.maxDDChartDataset = [row.spxtr, row.efa, row.vt, row.account];
      }
    });
  }
  /**
   * Creates chart maxDDChart with predefined configuration
   * @returns updated maxDDChart
   */
  createMaxDDChart(): Chart {
    this.maxDDChart = new Chart('maxDDChart', {
      type: 'bar',
      data: {
        // values on X-Axis
        labels: ['spxtr', 'efa', 'vt', 'account'],
        datasets: [
          {
            label: 'Max Drawdown',
            data: this.maxDDChartDataset,
            backgroundColor: 'red',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Max Drawdown',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
    return this.maxDDChart;
  }
  /**
   * Creates chart sharpeSortinoChart with predefined configuration
   * @returns updated sharpeSortinoChart
   */
  createSharpeSortinoChart(): Chart {
    this.sharpeSortinoChart = new Chart('sharpeSortinoChart', {
      type: 'bar',
      data: {
        // values on X-Axis
        labels: ['spxtr', 'efa', 'vt', 'account'],
        datasets: [
          {
            label: 'Sharpe Value',
            data: this.sharpeChartDataset,
            backgroundColor: this.checkZeroValue,
          },
          {
            label: 'Sortino Value',
            data: this.sortinoChartDataset,
            backgroundColor: this.checkZeroValue,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Sharpe/Sortino',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
    return this.sharpeSortinoChart;
  }
  /**
   * Creates chart endingVamiChart with predefined configuration
   * @returns updated endingVamiChart
   */
  createEndingVamiChart(): Chart {
    this.endingVamiChart = new Chart('endingVamiChart', {
      type: 'bar',
      data: {
        // values on X-Axis
        labels: ['spxtr', 'efa', 'vt', 'account'],
        datasets: [
          {
            label: 'Ending VAMI',
            data: this.endingVamiChartDataset,
            backgroundColor: 'orange',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Ending VAMI',
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    });
    return this.endingVamiChart;
  }

  /**
   * Util method for defining color
   * @param context data attribute of the {@link Chart}
   * @returns color if value in the data is less/more than 0
   */
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
