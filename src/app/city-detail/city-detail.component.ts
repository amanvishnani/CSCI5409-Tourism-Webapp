import { Component, OnInit } from '@angular/core';
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";

import data from '../../assets/sample.json'

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {

  faBus = faBus

  constructor() { }
  title = 'json-file-read-angular';
  places: any = data;


  ngOnInit(): void {
  }

}
