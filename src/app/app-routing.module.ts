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
import { AttractionDetailsComponent } from './attraction-details/attraction-details.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';


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
  component: BookBusComponent,
  canActivate: [AuthGuard],
  canLoad: [AuthGuard]
}, {
  path: 'city/:cityId',
  component: CityDetailComponent
}, {
  path:'attraction/:id',
  component: AttractionDetailsComponent
}, {
  path: 'logout',
  component: LogoutComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
