import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {

  public userBookings: Booking[] = []

  constructor(private bookingSvc: BookingService) { }

  ngOnInit(): void {
    this.getAllUserBookings()
  }

  getAllUserBookings() {
    this.bookingSvc.getUserBooking().subscribe(
      bookings => this.userBookings = bookings
    )
  }

}
