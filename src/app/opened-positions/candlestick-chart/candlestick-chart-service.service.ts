import { Injectable } from '@angular/core';
import { restClient } from '@polygon.io/client-js';
import {
  IChartApi,
  ISeriesApi,
  SeriesType,
  createChart,
} from 'lightweight-charts';
import { BarItem } from './bar-item';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CandlestickChartServiceService {
  private apiKey = environment.polygonApiKey;
  // TW chart attributes
  private chartOptions = {
    width: 1200,
    height: 500,
    timeScale: {
      timeVisible: true,
      secondsVisible: false,
    },
    rightPriceScale: {
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    },
    crosshair: {
      mode: 1,
    },
    grid: {
      vertLines: {
        visible: true,
      },
      horzLines: {
        visible: true,
      },
    },
  } as const;
  private charts: Map<string, IChartApi> = new Map();
  private chartSeries: Map<IChartApi, ISeriesApi<'Candlestick'>> = new Map();
  constructor() {}

  public getChartData(ticker: string, chartId: string): void {
    const rest = restClient(this.apiKey); // connect to PolygonIo rest client

    // calculate a year ago from now
    const yearAgo = this.dateFormatter(
      new Date(Date.now() - 365 * 86400 * 1000)
    );
    // get today's date in format YYYY-MM-dd
    const today = this.dateFormatter(new Date(Date.now()));

    // request chart data from API
    rest.stocks
      .aggregates(ticker, 1, 'day', yearAgo, today)
      .then((data) => {
        // create array to store chart data
        let bars: BarItem[] = [];
        if (typeof data.results !== 'undefined') {
          data.results.forEach((bar) => {
            if (typeof bar !== 'undefined') {
              bars.push({
                time: this.dateFormatter(new Date(bar.t as number)),
                open: bar.o as number,
                high: bar.h as number,
                low: bar.l as number,
                close: bar.c as number,
              });
            }
          });
          console.log(`Chart data for ${ticker}:`, bars);
          console.log('length', bars.length);

          if (this.charts.has(chartId)) {
            // update chart with new ticker's data
            this.reBuildChart(bars, chartId);
          } else {
            // build chart with the collected data
            this.buildChart(bars, chartId);
          }
        } else {
          console.log('No results found for such query:', data.results);
        }
      })
      .catch((e) => {
        console.log('error happened fetching data:', e);
      });
  }

  /**
   * Builds TW Chart
   */
  private buildChart(data: BarItem[], chartId: string): void {
    let chart = this.charts.get(chartId)!;

    if (typeof chart == 'undefined' || null) {
      chart = createChart(document.getElementById(chartId)!, this.chartOptions);
      console.log('Chart with id [' + chartId + '] has been created');
      // map chartId to the created chart
      this.charts.set(chartId, chart);
    }

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#1e7d36',
      downColor: '#000',
      borderVisible: true,
      wickUpColor: '#1e7d36',
      wickDownColor: '#000',
      borderColor: '#000',
    });

    // map chart and series
    this.chartSeries.set(chart, candlestickSeries);

    candlestickSeries.setData(data);
    chart.timeScale().fitContent();
  }

  /**
   * Remove the existing chart's series to update the most recent series data
   * @param data array of daily bars 
   * @param chartId chart's container id
   */
  private reBuildChart(data: BarItem[], chartId: string) {
    // get existing chart's series
    const existingChart = this.charts.get(chartId)!;
    const existingChartSeries = this.chartSeries.get(existingChart)!;

    // remove existing chart's series
    existingChart.removeSeries(existingChartSeries);

    // build chart after removal
    this.buildChart(data, chartId);
  }

  /**
   * Format time to the required format
   * @param date Date object
   * @returns formatted time accordign to 'YYYY-MM-dd'
   */
  private dateFormatter(date: Date): string {
    const year = date.getFullYear();
    let month = date.getUTCMonth();
    const day =
      date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();

    // date.getUTCMonth() returns months starting from 0
    month++;

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day}`;

    return formattedDate;
  }
}
