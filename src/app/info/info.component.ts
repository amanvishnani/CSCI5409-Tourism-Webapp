import { Component, OnInit } from '@angular/core';
import data from '../../assets/sample.json'
import { Router } from '@angular/router';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private router: Router) { }
  title = 'json-file-read-angular';
  products: any = data;
  type: string;

  ngOnInit() {
    if(this.router.url.indexOf("attractions") != -1) {
      this.type = "attractions"
    } else {
      this.type = "city"
    }
    console.log();
  }

}
