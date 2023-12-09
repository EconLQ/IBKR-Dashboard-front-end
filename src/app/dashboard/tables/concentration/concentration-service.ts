import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ConcentrationHoldingsItem } from './concentration-item';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root',
})
export class ConcentrationHoldingsService {
  private dashBoardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dashBoardEndpoint}/concentration-holdings`;

  // chart
  concentrationHoldingsChart: any;
  // dataset
  concentrationHoldingsDataset: number[] = [];
  symbols: string[] = [];
  sectors: string[] = [];
  totalNetValue: number = 0;
  // table's data
  tableData: ConcentrationHoldingsItem[] = [];

  constructor(private httpClient: HttpClient) {}

  getConcentrationHoldingsData() {
    this.httpClient
      .get<Observable<ConcentrationHoldingsItem[]>>(this.tableEndpoint)
      .subscribe(
        (response: Observable<ConcentrationHoldingsItem[]>) => {
          console.log('getConcentrationHoldingsData', response);
          this.tableData = response as any;

          this.getConcentrationHoldingsDataset();
          this.createConcentrationHoldingsChart();
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }

  getConcentrationHoldingsDataset() {
    this.tableData.forEach((row) => {
      // we don't need total for the doughnut chart
      if (row.symbol != 'Total' && row.symbol.length > 1) {
        this.concentrationHoldingsDataset.push(
          row.netValue < 0 ? row.netValue * -1 : row.netValue
        );
        // calculate total net value (shorts inclusive)
        this.totalNetValue +=
          row.netValue < 0 ? row.netValue * -1 : row.netValue;

        this.symbols.push(row.symbol);
        this.sectors.push(row.sector);
      }
    });
  }

  createConcentrationHoldingsChart(): Chart {
    this.concentrationHoldingsChart = new Chart('concentrationHoldingsChart', {
      type: 'doughnut',
      data: {
        labels: this.sectors,
        datasets: [
          {
            label: 'Concentration Holdings',
            data: this.concentrationHoldingsDataset,
            backgroundColor: [
              'grey',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'blue',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Concentration Holdings (Sectors)',
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
                Number((value / this.totalNetValue) * 100).toFixed(2) + '%'
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
    return this.concentrationHoldingsChart;
  }
}
