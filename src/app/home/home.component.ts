import { Component, OnInit } from '@angular/core';

import data from '../../assets/sample.json'
import { InfoService } from '../info.service';
import { Attraction } from '../Attraction';
import { City } from '../city';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  places: any = data;

  topAttractions: Attraction[]
  topCities: City[]

  constructor(private infoSvc: InfoService) { }

  ngOnInit(): void {
    this.getTopAttractions()
    this.getTopCities()
  }

  getTopAttractions() {
    this.infoSvc.getTopAttractions()
    .subscribe(atr => {
      this.topAttractions = atr
    })
  }

  getTopCities() {
    this.infoSvc.getTopCities()
    .subscribe(cts => {
      this.topCities = cts
    })
  }

}
