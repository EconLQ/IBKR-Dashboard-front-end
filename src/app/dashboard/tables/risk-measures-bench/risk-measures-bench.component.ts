import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-risk-measures-bench',
  templateUrl: './risk-measures-bench.component.html',
  styleUrl: './risk-measures-bench.component.css',
})
export class RiskMeasuresBenchComponent implements OnInit {
  apiBaseUrl = environment.apiBaseUrl;
  dashboardBaseUrl = `${this.apiBaseUrl}/dashboard`;

  riskMeasuresBenchComp: RiskMeasuresBenchComponent[] = [];
  
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getRiskMeasuresBenchComp();
  }

  getRiskMeasuresBenchComp() {
    this.httpClient
      .get<RiskMeasuresBenchComponent[]>(
        `${this.dashboardBaseUrl}/risk-measures-benchmark`
      )
      .subscribe(
        (response: RiskMeasuresBenchComponent[]) => {
          console.log('Response', response);
          this.riskMeasuresBenchComp = response;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
