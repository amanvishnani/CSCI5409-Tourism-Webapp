import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, filter} from 'rxjs/operators';
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../info.service';
import { BookingService } from '../booking.service';
import { AuthService } from '../auth-service.service';
import { NgbDate, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bus-booking',
  templateUrl: './bus-booking.component.html',
  styleUrls: ['./bus-booking.component.scss']
})
export class BusBookingComponent implements OnInit {

  private top_cities_labels = []
  city_labels = [];

  faCalendar = faCalendar
  public sourceCity: any;
  public destinationCity: any;
  public journeyDate: any;
  public cityMap: Record<string, string> = {};
  public busRoutes: any[] = []
  public isLoggedIn;
  public allRoutes: any[] = []

  constructor(
    private route: ActivatedRoute,
    private infoSvc: InfoService,
    private bookingSvc: BookingService,
    private router: Router,
    private as: AuthService) { }

  ngOnInit(): void {
    this.setupView()
    this.isLoggedIn = this.as.isLoggedIn
    if(this.bookingSvc.searchState) {
      this.restoreSearchState()
    }
  }
  
  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? this.top_cities_labels
        : this.city_labels.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  }

  async setupView() {
    this.infoSvc.getAllCities().subscribe(
      cities => {
        
        for (const city of cities) {
          this.city_labels.push(city.name)
          this.cityMap[city.name] = city.id
        }
        this.top_cities_labels = this.city_labels.filter((ele, idx) => idx<10)
      }
    )
    this.route.queryParams.pipe(filter(obj => obj.destination)).subscribe(
      param => this.destinationCity = param.destination
    )
  }

  onSourceCityChange(event) {
    this.sourceCity = event.item
    let ob = this.searchJourney()
    if(ob) {
      ob.subscribe(this.updateAllRoutes);
    }
  }

  onDestCityChange(event) {
    this.destinationCity = event.item
    let ob = this.searchJourney()
    if(ob) {
      ob.subscribe(this.updateAllRoutes);
    }
  }

  updateAllRoutes = arr => {
    this.allRoutes = arr.map(rt => {
      let [year, month, day] = rt[0].split("-")
      return {
        year,
        month, 
        day
      }
    });
  }

  searchRoutes() {
    let ob = this.searchJourney()
    if(ob)
    ob.pipe(map( arr => {
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

  searchJourney() {
    let sourceCityId = this.cityMap[this.sourceCity];
    let destinationCityId = this.cityMap[this.destinationCity];
    if(!sourceCityId || !destinationCityId) {
      return null
    }
    return this.bookingSvc.searchRoutes(sourceCityId, destinationCityId)
  }

  bookBus(bus: any) {
    this.bookingSvc.bookingState = {bus, sourceCity: this.sourceCity, destinationCity: this.destinationCity}
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

  journeyUnavailable = (date: NgbDate, current?: {year: number, month: number}) => {
    for (const rt of this.allRoutes) {
      if(rt.day == date.day &&
        rt.month == date.month &&
        rt.year == date.year) {
          return false
        }
    }
    return true;
  }
  saveSearchState() {
    this.bookingSvc.searchState = {
      sourceCity: this.sourceCity,
      destinationCity: this.destinationCity,
      journeyDate: this.journeyDate
    }
  }

  restoreSearchState() {
    this.sourceCity = this.bookingSvc.searchState.sourceCity
    this.destinationCity = this.bookingSvc.searchState.destinationCity
    this.journeyDate = this.bookingSvc.searchState.journeyDate
    this.bookingSvc.searchState = null;
    this.searchRoutes()
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
