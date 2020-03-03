import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "aman"
  password = "aman@1234"

  constructor(private ampSvc: AmplifyService) { }

  ngOnInit(): void {
  }

  async login() {
    try {
      debugger
      let auth = this.ampSvc.auth()
      let r = await auth.signIn(this.username, this.password)
      if(r?.challengeName == "NEW_PASSWORD_REQUIRED") {
        let r1 = await auth.completeNewPassword(r, this.password, r.challengeParam.requiredAttributes)
        console.log(r1);
      }
      debugger
      
    } catch (error) {
      console.log(error);
      
    }
  }

}
