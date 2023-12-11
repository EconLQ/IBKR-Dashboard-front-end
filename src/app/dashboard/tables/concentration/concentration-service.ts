import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ConcentrationSectorsItem } from './concentration-item';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';
import 'chartjs-plugin-datalabels';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root',
})
export class ConcentrationHoldingsService {
  private dashBoardEndpoint = environment.dashboardEndpoit;
  private tableEndpoint = `${this.dashBoardEndpoint}/concentration-sectors`;

  // chart
  concentrationSectorsChart: any;
  // dataset
  concentrationSectorsDataset: Array<number[]> = [];
  sectors: string[] = [];
  // table's data
  tableData: ConcentrationSectorsItem[] = [];

  constructor(private httpClient: HttpClient) {}

  getConcentrationHoldingsData() {
    this.httpClient
      .get<Observable<ConcentrationSectorsItem[]>>(this.tableEndpoint)
      .subscribe(
        (response: Observable<ConcentrationSectorsItem[]>) => {
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
    let longParsedWeigthArr: number[] = [];
    let shortParsedWeigthArr: number[] = [];

    this.tableData.forEach((row) => {
      // we don't need total and unclassified for the doughnut chart
      if (row.sector != 'Total' && row.sector != 'Unclassified') {
        longParsedWeigthArr.push(row.longParsedWeight);
        shortParsedWeigthArr.push(row.shortParsedWeight);
        this.sectors.push(row.sector);
      }
    });

    this.concentrationSectorsDataset.push(
      longParsedWeigthArr,
      shortParsedWeigthArr
    );
    console.log(
      'concentrationSectorsDataset',
      this.concentrationSectorsDataset
    );
  }

  createConcentrationHoldingsChart(): Chart {
    this.concentrationSectorsChart = new Chart('concentrationSectorsChart', {
      type: 'doughnut',
      data: {
        labels: this.sectors,
        datasets: [
          {
            label: 'Concentration (Sectors Allocation) Longs',
            data: this.concentrationSectorsDataset[0],
            hoverOffset: 4,
          },
          {
            label: 'Concentration (Sectors Allocation) Shorts',
            data: this.concentrationSectorsDataset[1],
            hoverOffset: 4,
            backgroundColor: ['violet', 'orange', 'green', 'yellow'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Concentration (Sectors Allocation)',
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
              return Number(value).toFixed(2) + '%';
            },
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: [ChartDataLabels],
    });
    return this.concentrationSectorsChart;
  }
}
