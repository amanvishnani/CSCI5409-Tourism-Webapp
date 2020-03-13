import { Component, OnInit } from '@angular/core';
import data from '../../assets/sample.json'



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor() { }
  title = 'json-file-read-angular';
  products: any = data;

  ngOnInit() {

    console.log(data);
  }

}
