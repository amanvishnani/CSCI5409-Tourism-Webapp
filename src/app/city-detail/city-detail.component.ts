import { Component, OnInit } from '@angular/core';
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";

import data from '../../assets/sample.json'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { InfoService } from '../info.service';
import { City } from '../city';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {

  city: City = City.dummy()
  attractions = []
  faBus = faBus

  constructor(
    private ar: ActivatedRoute,
    private infoSvc: InfoService
    ) { }
  title = 'json-file-read-angular';
  places: any = data;


  ngOnInit(): void {
    this.ar.params.pipe(map(param => param.cityId))
    .subscribe(cityId => {
      this.getCityDetail(cityId)
    })
  }

  getCityDetail(cityId){
    this.infoSvc.getCityDetail(cityId).subscribe(city => {
      this.city = city
      this.getCityAttractions(cityId)
    })
  }

  getCityAttractions(cityId) {
    this.infoSvc.getCityAttractions(cityId).subscribe(attractions => {
      this.attractions = attractions
    })
  }

}
