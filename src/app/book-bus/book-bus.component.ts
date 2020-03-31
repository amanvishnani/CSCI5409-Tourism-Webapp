import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from "rxjs/operators";
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-book-bus',
  templateUrl: './book-bus.component.html',
  styleUrls: ['./book-bus.component.scss']
})
export class BookBusComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private bookingSvc: BookingService,
    private router: Router
    ) { }

  public busDetails;
  public numTickets: number = 1;
  public cardNumber: string
  public cvv: string;
  public cardExp: number

  ngOnInit() {
    this.busDetails = this.bookingSvc.bookingState;
    if(!this.busDetails) {
      alert("Something went wong!")
    }
  }

  payAndcompleteBooking() {
    let month = Math.floor(this.cardExp/100) + ""
    let year = (this.cardExp%100) + ""
    this.bookingSvc.bookBus({
      amount: `${this.busDetails.bus.cost * this.numTickets}`,
      totalSeats: `${this.numTickets}`,
      holderName: "Jon Doe",
      journeyId: this.busDetails.bus.id,
      cardNumber: this.cardNumber,
      cvv: this.cvv,
      mm: month,
      yy: year,
      transactionMode: "Credit Card"
    }).subscribe(
      result => {
        alert(result.message)
        if(result.message == "Booking Successful!") {
          this.router.navigateByUrl("/user-bookings")
        }
      }
    )
  }

}


