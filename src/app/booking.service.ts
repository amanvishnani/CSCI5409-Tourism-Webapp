import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { BookingInfo } from './booking-info';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public bookingState: any 

  private BASE_URL: string

  constructor(private http: HttpClient) { 
    this.BASE_URL = `${environment.baseUrl}/booking`
  }

  searchRoutes(sourceId: string, destinationId: string) {
    return this.http.get<string[][]>(`${this.BASE_URL}/journey/journeyBySourceDestination`, {
      params: {
        sourceId, destinationId
      }
    })
  }

  bookBus(info :BookingInfo) {
    return this.http.get<string>(`${this.BASE_URL}/booking/addBooking`, {
      params: {
        ...info
      }
    })
  }

  getAvailiableSeats(journeyId:any) {
    const httpOptions: Object = {
      responseType: 'text',
      params: {
        'journeyId': journeyId, 
        'totalSeats': '1'
      }
    };
    return this.http.get(`${this.BASE_URL}/booking/getBookingConfirmation`, httpOptions)
  }
}
