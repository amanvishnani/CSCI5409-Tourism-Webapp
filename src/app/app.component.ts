import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tourism-app';
  constructor() {
    this.fun()
  }
  async fun() {
    try {
      console.log(await Auth.currentAuthenticatedUser());
    } catch(e) {
      console.log(e);
    }
  }
}
