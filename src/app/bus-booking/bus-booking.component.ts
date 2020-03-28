import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../info.service';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth-service.service';

const city_labels = [];

@Component({
  selector: 'app-bus-booking',
  templateUrl: './bus-booking.component.html',
  styleUrls: ['./bus-booking.component.scss']
})
export class BusBookingComponent implements OnInit {

  private top_cities_labels = []

  faCalendar = faCalendar
  public sourceCity: any;
  public destinationCity: any;
  public journeyDate: any;
  public cityMap: Record<string, string> = {};
  public busRoutes: any[] = []
  public isLoggedIn;

  constructor(
    private route: ActivatedRoute,
    private infoSvc: InfoService,
    private bookingSvc: BookingService,
    private router: Router,
    private as: AuthService) { }

  ngOnInit(): void {
    this.setupView()
    this.isLoggedIn = this.as.isLoggedIn
  }
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? this.top_cities_labels
        : city_labels.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  async setupView() {
    this.infoSvc.getAllCities().subscribe(
      cities => {
        for (const city of cities) {
          city_labels.push(city.name)
          this.cityMap[city.name] = city.id
        }
        this.top_cities_labels = city_labels.filter((ele, idx) => idx<10)
      }
    )
    this.route.queryParams.pipe(filter(obj => obj.destination)).subscribe(
      param => this.destinationCity = param.destination
    )
  }

  searchRoutes() {
    let sourceCityId = this.cityMap[this.sourceCity];
    let destinationCityId = this.cityMap[this.destinationCity];
    this.bookingSvc.searchRoutes(sourceCityId, destinationCityId)
    .pipe(map( arr => {
      return arr.filter( arr1 => {
        return arr1[0] == formatDate(this.journeyDate)
      })
    }))
    .subscribe(
      busRoutes => {
        this.busRoutes = []
        for (const rt of busRoutes) {
          this.busRoutes.push({
            duration: rt[1],
            cost: rt[2],
            type: rt[3],
            seats: rt[4],
            operator: rt[5],
            id: rt[7],
            date: rt[0]
          })
        }
      }
    )
  }

  bookBus(bus: any) {
    this.bookingSvc.bookingState = {bus, sourceCity: this.sourceCity, destinationCity: this.destinationCity}
    // debugger
    this.router.navigateByUrl('/book-bus')
  }

  getRef() {
    return `${this.router.url}`
  }

  checkAvailibility(bus) {
    let journeyId = bus.id
    this.bookingSvc.getAvailiableSeats(journeyId).subscribe(
      totalAvail => bus.seatsAvailable = totalAvail
    );
  }
  

}

function formatDate(date) {
  let year = date.year
  let month = `${date.month}`
  let day = `${date.day}`

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
