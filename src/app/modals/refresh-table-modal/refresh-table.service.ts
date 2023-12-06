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

    this.httpClient.get(`${this.applicationUrl}/app-servlet`).subscribe(
      (response) => {
        console.log('Positions fetched succesfully...', response);
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
