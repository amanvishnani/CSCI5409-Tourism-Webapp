import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "aman"
  password = "Aman@1234"
  code = ''
  mode = 'login'
  user = null
  errorMessage = ''

  constructor(
    private ampSvc: AmplifyService, 
    private router: Router,
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) { }

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
      } else {
        this.gotoNextPage()
      }
      
    } catch (error) {
      this.errorMessage = 'Verification Failed please try again'
    }
  }

  async verify() {
    let auth = this.ampSvc.auth()
    try {
      let r = await auth.confirmSignIn(this.user, this.code)
      this.ampSvc.setAuthState({
        state: 'signedIn',
        user: r
      })
      alert("SUCCESS")
      this.gotoNextPage()
    } catch (error) {
      console.log(error)
    }
  }

  gotoNextPage() {
    this.route.queryParamMap.subscribe(
      map => {
        if(map.get("ref")) {
          this.router.navigateByUrl(`/${map.get("ref")}`)
        } else {
          this.router.navigateByUrl(`/`)
        }
      }
    )
  }

}
