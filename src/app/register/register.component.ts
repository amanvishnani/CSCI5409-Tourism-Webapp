import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  username = ""
  password = ""
  email = ""
  errorMessage = ""
  infoMessage = ''
  phone = ''
  mode = 'registration'
  code = ''

  constructor(private ampSvc: AmplifyService, private router: Router) { }

  ngOnInit(): void {
  }

  async register() {
    let auth = this.ampSvc.auth()
    try {
      let r = await auth.signUp({
        username: this.username,
        password: this.password,
        attributes: {
          email: this.email,
          phone_number: this.phone
        }
      })
      let codeDelivery = r?.codeDeliveryDetails?.AttributeName
      if(codeDelivery) {
        this.infoMessage = `Please verify code sent on your ${codeDelivery}`
      }
      this.errorMessage = ''
      this.mode = 'verification'
    } catch (error) {
      this.errorMessage = error.message
    }
  }

  async verify() {
    let auth = this.ampSvc.auth()
    try {
      let r = await auth.confirmSignUp(this.username, this.code)
      if(r=="SUCCESS") {
        alert("SUCCESS")
        this.router.navigateByUrl("/login")
      }
    } catch (error) {
      
    }
  }

}
