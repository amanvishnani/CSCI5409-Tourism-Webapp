import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../Place';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss']
})
export class InfoCardComponent implements OnInit {

  @Input('place')
  place: Place
  constructor() { }

  ngOnInit(): void {
  }

}
