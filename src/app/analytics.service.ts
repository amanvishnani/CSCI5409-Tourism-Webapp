import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  

  private BASE_URL: string

  constructor(private http: HttpClient) { 
    this.BASE_URL = `${environment.baseUrl}/analytics`
  }

  getJourneyStats() {
    interface DailyStats {
      date: string;
      busCapacity: string;
      freeSeats: number;
    }

    return this.http
    .get<DailyStats[]>(`${this.BASE_URL}/journeyStats/crowdForAllJourneys`)
  }
}
