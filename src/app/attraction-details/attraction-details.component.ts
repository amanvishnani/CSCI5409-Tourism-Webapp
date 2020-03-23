import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Attraction } from '../Attraction';

@Component({
  selector: 'app-attraction-details',
  templateUrl: './attraction-details.component.html',
  styleUrls: ['./attraction-details.component.scss']
})
export class AttractionDetailsComponent implements OnInit {

  attraction: Attraction = Attraction.dummy()

  constructor(
    private route: ActivatedRoute,
    private infoSvc: InfoService
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(map(param => param.id))
    .subscribe(
      id => {
        this.getAttractionById(id)
      }
    )
  }

  getAttractionById(locationId) {
    this.infoSvc.getAttractionById(locationId).subscribe(
      atr => this.attraction = atr
    )
  }

}
