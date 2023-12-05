import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  apiBaseUrl = environment.apiBaseUrl;
  dashboardBaseUrl = `${this.apiBaseUrl}/dashboard`;

  isUploaded: boolean = false;

  constructor(private httpClient: HttpClient) {}

  @ViewChild('fileImportInput') fileImportInput: any;

  onNodeMouseover($event: Event) {}
  public importDataFromCSV(event: any): void {
    this.isUploaded = false;
    const file: File = event.srcElement.files[0];

    // formdata
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // send request to server
    this.httpClient.post(`${this.apiBaseUrl}/upload`, formData).subscribe(
      (response) => {
        console.log('Response', response);
        this.isUploaded = true;
      },
      (error) => {
        if (error.status == 200) {
          console.log('Response is OK');
        } else {
          console.log('error', error);
        }
      }
    );
  }
}
