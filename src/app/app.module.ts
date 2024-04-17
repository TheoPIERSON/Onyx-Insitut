import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './static/background/background.component';
import { NavbarComponent } from './static/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeImagesComponent } from './component/home-images/home-images.component';
import { HeroComponent } from './static/hero/hero.component';
import { AppointmentFormComponent } from './component/appointment-form/appointment-form.component';
import { FooterComponent } from './component/footer/footer.component';
import { MonTravailComponent } from './component/mon-travail/mon-travail.component';

import { CalendarComponent } from './component/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LoginFormComponent } from './login/login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    NavbarComponent,
    HomeImagesComponent,
    HeroComponent,
    AppointmentFormComponent,
    FooterComponent,
    MonTravailComponent,
    CalendarComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
