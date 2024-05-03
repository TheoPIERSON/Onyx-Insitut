import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './static/background/background.component';
import { NavbarComponent } from './static/navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeImagesComponent } from './component/body/home-images/home-images.component';
import { HeroComponent } from './static/hero/hero.component';
import { AppointmentFormComponent } from './component/body/customer-form/appointment-form.component';
import { FooterComponent } from './component/footer/footer.component';
import { MonTravailComponent } from './component/body/mon-travail/mon-travail.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { LoginFormComponent } from './pages/login-screen/login-form/login-form.component';
import { BodyComponent } from './component/body/body.component';
import { LoginComponent } from './pages/login-screen/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { BookingFormComponent } from './pages/book-appointment/booking-form/booking-form.component';
import { ActivationFormComponent } from './pages/activation-form/activation-form.component';

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
    LoginFormComponent,
    BodyComponent,
    LoginComponent,
    BookAppointmentComponent,
    BookingFormComponent,
    ActivationFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
