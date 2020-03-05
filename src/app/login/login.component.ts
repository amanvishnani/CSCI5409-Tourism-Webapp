import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "aman"
  password = "aman@1234"
  code = ''
  mode = 'login'
  user = null
  errorMessage = ''

  constructor(private ampSvc: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  async login() {
    try {
      let auth = this.ampSvc.auth()
      let r = await auth.signIn(this.username, this.password)
      this.user = r
      if(r?.challengeName == "NEW_PASSWORD_REQUIRED") {
        let r1 = await auth.completeNewPassword(r, this.password, r.challengeParam.requiredAttributes)
      } else if (r?.challengeName == "SMS_MFA") {
        this.mode = 'verification'
      }
      
    } catch (error) {
      this.errorMessage = 'Verification Failed please try again'
    }
  }

  async verify() {
    let auth = this.ampSvc.auth()
    try {
      let r = await auth.confirmSignIn(this.user, this.code)
      alert("SUCCESS")
      this.router.navigateByUrl("/")
    } catch (error) {
      console.log(error)
    }
  }

}
