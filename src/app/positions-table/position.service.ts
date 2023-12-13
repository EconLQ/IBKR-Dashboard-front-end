import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './position';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.apiServerUrl}/positions`);
  }
  public addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>(`${this.apiServerUrl}/positions`, position);
  }

  public updatePosition(
    contractId: number,
    position: Position
  ): Observable<Position> {
    return this.http.put<Position>(
      `${this.apiServerUrl}/positions/${contractId}`,
      position
    );
  }

  public deletePosition(contractId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/positions/${contractId}`
    );
  }

  public findPosition(contractId: number): Observable<Position> {
    return this.http.get<Position>(
      `${this.apiServerUrl}/positions/${contractId}`
    );
  }

  public closePosition(position: Position): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/positions/close`,
      position
    );
  }

  public addToPosition(position: Position): Observable<void> {
    return this.http.post<void>(
      `${this.apiServerUrl}/positions/add-to`,
      position
    );
  }
}
