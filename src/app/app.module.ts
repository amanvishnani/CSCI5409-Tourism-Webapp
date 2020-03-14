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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    InfoCardComponent,
    NavBarComponent
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
    MatCardModule
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
