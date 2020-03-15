import { Component, OnInit } from '@angular/core';

import data from '../../assets/sample.json'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  places: any = data;

  constructor() { }

  ngOnInit(): void {
  }

}
