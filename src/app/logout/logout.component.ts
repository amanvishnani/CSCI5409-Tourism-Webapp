import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private ampSvc: AmplifyService) { }

  ngOnInit(): void {
    this.logout()
  }

  logout() {
    let authObj = this.ampSvc.auth();
    authObj.signOut()
  }

}
