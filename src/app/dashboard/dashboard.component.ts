import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CsvService } from './services/csv.services';
import { NgxCSVParserError, NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  csvRecords: any;
  header: boolean = false;

  constructor(
    private _csvService: CsvService,
    private ngxCsvParser: NgxCsvParser
  ) {}

  @ViewChild('fileImportInput') fileImportInput: any;
  /**
   * Using NgxCsvParser lib
   */
  public importDataFromCSV(event: any): void {
    const files: Array<File> = event.srcElement.files;
    this.header =
      (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser
      .parse(files[0], {
        header: this.header,
        delimiter: ',',
        encoding: 'utf8',
      })
      .pipe()
      .subscribe({
        next: (result): void => {
          console.log('Result:', result);
          this.csvRecords = result;
        },
        error: (error: NgxCSVParserError): void => {
          console.log('Error', error);
        },
      });
  }
  /**
   * Import data via custom CSVService
   * @param event upload file event on input trigger
   */
  // public async importDataFromCSV(event: any) {
  //   let fileContent = await this.getTextFromFile(event);
  //   this.importedData = this._csvService.importDataFromCSV(fileContent);
  // }

  // async getTextFromFile(event: any) {
  //   const file: File = event.target.files[0];
  //   let fileContent = await file.text();
  //   return fileContent;
  // }

  // uploadFile(file: any) {
  //   let formData = new FormData();
  //   formData.append('file', new Blob([file], { type: 'text/csv' }), file.name);

  //   // formData.append('file', file, file.name);

  //   this.httpClient
  //     .post(`${this.apiBaseUrl}/upload`, formData, {
  //       headers: new HttpHeaders("'Content-Type', 'multipart/form-data'"),
  //     })
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.log('Error uploading file: ', error);
  //       }
  //     );
  // }
}
