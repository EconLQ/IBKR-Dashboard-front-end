import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RefreshTableService {
  applicationUrl = environment.applicationUrl;
  lastPositionUpdateDateTime: string = '';

  constructor(private httpClient: HttpClient) {}

  /**
   * speaks to a back-end client (servlet) which start application on GET request
   */
  public updatePositionsTable(): boolean {
    const date: Date = new Date();

    this.httpClient
      .get<Response>(`${this.applicationUrl}/app-servlet`)
      .subscribe(
        (response: Response) => {
          if (response.status == 202) {
            console.log("Connected to IB, but didn't fetch positions...");
            // reload the page to ask client to send request one more time
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            console.log('Response is OK. Positions fetched succesfully...');
          }
        },
        (error) => {
          if (error.status == 200) {
            console.log('Positions fetched...');
            // set new date
            this.lastPositionUpdateDateTime = `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

            // add new date to a session storage
            sessionStorage.setItem(
              'lastPositionUpdateDateTime',
              this.lastPositionUpdateDateTime
            );
            // reload the page to update values in the table
            setTimeout(() => {
              window.location.reload();
            }, 1000);

            return true;
          } else {
            console.error('Error fetching position', error);
            return false;
          }
        }
      );

    return true;
  }
}
