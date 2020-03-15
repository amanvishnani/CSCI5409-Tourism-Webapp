import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmSignUpComponent } from 'aws-amplify-angular';
import { InfoComponent } from './info/info.component';
import { BusBookingComponent } from './bus-booking/bus-booking.component';
import { BookBusComponent } from './book-bus/book-bus.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { HomeComponent } from './home/home.component';


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
  component: HomeComponent
}, {
  path: 'cities',
  component: InfoComponent
}, {
  path: 'attractions',
  component: InfoComponent
}, {
  path: 'bus-bookings',
  component: BusBookingComponent
}, {
  path: 'book-bus',
  component: BookBusComponent
}, {
  path: 'city/:cityId',
  component: CityDetailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
