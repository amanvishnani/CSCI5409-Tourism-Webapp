import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AmplifyAngularModule, AmplifyService } from "aws-amplify-angular";
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BusBookingComponent } from './bus-booking/bus-booking.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookBusComponent } from './book-bus/book-bus.component';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { HomeComponent } from './home/home.component';
import { AttractionDetailsComponent } from './attraction-details/attraction-details.component';
import { MatStepperModule } from "@angular/material/stepper";
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http-interceptor';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    InfoCardComponent,
    NavBarComponent,
    BusBookingComponent,
    BookBusComponent,
    CityDetailComponent,
    HomeComponent,
    AttractionDetailsComponent,
    LogoutComponent,
    UserBookingsComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    AmplifyAngularModule,
    FormsModule,
    MatCardModule,
    NgbModule,
    FontAwesomeModule,
    MatStepperModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [AmplifyService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
