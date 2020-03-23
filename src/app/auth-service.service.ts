import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean
  public loginState: Observable<boolean>

  constructor(private ampSvc: AmplifyService) { 
    this.loginState = this.ampSvc.authStateChange$.pipe(map(as => as.state == 'signedIn'))
    this.loginState.subscribe(state => this.isLoggedIn = state)
    this.setupState()
  }

  async setupState() {
    try {
      let user = await this.ampSvc.auth().currentAuthenticatedUser()
      this.ampSvc.setAuthState({
        user: user,
        state: 'signedIn'
      })
    } catch (error) {
      this.ampSvc.setAuthState({
        user: null,
        state: 'signedOut'
      })
    }
  }
}
