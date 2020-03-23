import { Component, OnInit } from '@angular/core';
import data from '../../assets/sample.json'
import { Router } from '@angular/router';
import { Place } from '../Place';
import { InfoService } from '../info.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  places: Place[]

  constructor(
    private router: Router, 
    private infoSvc: InfoService
    ) { }
  title = 'json-file-read-angular';
  products: any = data;
  type: string;

  ngOnInit() {
    if(this.router.url.indexOf("attractions") != -1) {
      this.type = "attraction"
      this.infoSvc.getAllAttractions()
      .subscribe(
        places => this.places = places
      )
    } else {
      this.type = "city"
      this.infoSvc.getAllCities()
      .subscribe(
        places => this.places = places
      )
    }
  }

  getKey(place: Place) {
    if(place.id) {
      return place.id
    } else if(place.locationId) {
      return place.locationId
    } else {
      return -1
    }
  }

}
