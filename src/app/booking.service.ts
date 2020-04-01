import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { BookingInfo } from './booking-info';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Booking } from './booking';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public bookingState: any 
  public searchState: any 

  private BASE_URL: string

  constructor(private http: HttpClient, private authSvc: AuthService) { 
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
    return this.http.get<any>(`${this.BASE_URL}/booking/addBooking`, {
      params: {
        ...info,
        email: this.authSvc.userEmail || ""
      }
    })
  }

  getAvailiableSeats(journeyId:any) {
    return this.http.get<any>(`${this.BASE_URL}/booking/getBookingConfirmationMap`, {
      params: {
        'journeyId': journeyId, 
        'totalSeats': '1'
      }
    }).pipe(map(r => r.seatsLeft))
  }

  getUserBooking() {
    let ob = this.http.get<Booking[]>(`${this.BASE_URL}/booking/bookingInfoByUserId`)
    return ob.pipe(map(
      bookings => {
        return bookings.map(a => {
          return {
                bookingId: a[0],
                transactionMode: a[1],
                amount: a[2],
                timestamp: a[3],
                totalSeats: a[4],
                journeyDate: a[5],
                duration: a[6],
                type: a[7],
                company: a[8],
                companyContact: a[9],
                sourceId: a[10],
                destinationId: a[11],
              }
        })
      }
    ))
  }
}
