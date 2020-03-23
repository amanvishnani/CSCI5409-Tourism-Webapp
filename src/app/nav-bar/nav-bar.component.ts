import { Component, OnInit } from '@angular/core';
import { AmplifyService } from "aws-amplify-angular";
import { map } from 'rxjs/operators';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  authState: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authState = this.authService.isLoggedIn
    this.authService.loginState
    .subscribe(state => this.authState = state)
  }

}
