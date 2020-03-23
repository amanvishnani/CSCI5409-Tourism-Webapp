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
      let user = await Auth.currentAuthenticatedUser()
      var session = user.signInUserSession
      if(!session?.accessToken?.jwtToken) {
        user.clearCachedUser()
      } else {
        console.log(session.accessToken.jwtToken);
      }
      
    } catch(e) {
      console.log(e);
    }
  }
}
