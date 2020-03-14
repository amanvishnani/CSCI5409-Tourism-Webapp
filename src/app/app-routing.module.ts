import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmSignUpComponent } from 'aws-amplify-angular';
import { InfoComponent } from './info/info.component';


const routes: Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'confirmSignUp',
  component: ConfirmSignUpComponent
}, {
  path: '',
  component: InfoComponent
}, {
  path: 'cities',
  component: InfoComponent
}, {
  path: 'attractions',
  component: InfoComponent
}, {
  path: 'bus-bookings',
  component: InfoComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
