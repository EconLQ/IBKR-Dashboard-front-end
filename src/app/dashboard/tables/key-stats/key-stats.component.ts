import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { KeyStatistics } from './key-statistics';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-key-stats',
  templateUrl: './key-stats.component.html',
  styleUrl: './key-stats.component.css',
})
export class KeyStatsComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  dashboardBaseUrl = `${this.apiBaseUrl}/dashboard`;

  keyStats: KeyStatistics[] = [];
  keyStatEntity: KeyStatistics = this.keyStats[0];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getKeyStatistics();
  }

  getKeyStatistics(): void {
    this.httpClient
      .get<KeyStatistics[]>(`${this.dashboardBaseUrl}/key-statistics`)
      .subscribe(
        (response: KeyStatistics[]) => {
          console.log('response', response);
          this.keyStats = response;
          this.keyStatEntity = this.keyStats[0];
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }
}
