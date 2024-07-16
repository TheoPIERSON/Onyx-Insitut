import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { BackgroundComponent } from './static/background/background.component';
import { NavbarComponent } from './static/navbar/navbar.component';
import { HomeImagesComponent } from './component/body/home-images/home-images.component';
import { HeroComponent } from './static/hero/hero.component';
import { AppointmentFormComponent } from './component/body/customer-form/appointment-form.component';
import { FooterComponent } from './component/footer/footer.component';
import { MonTravailComponent } from './component/body/mon-travail/mon-travail.component';
import { LoginFormComponent } from './pages/login-screen/login-form/login-form.component';
import { BodyComponent } from './component/body/body.component';
import { LoginComponent } from './pages/login-screen/login/login.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { BookingFormComponent } from './pages/book-appointment/booking-form/booking-form.component';
import { ActivationFormComponent } from './pages/activation-form/activation-form.component';
import { AppointmentModalComponent } from './pages/book-appointment/appointment-modal/appointment-modal.component';

import { BeholdWidgetComponent } from '@behold/angular';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { AuthInterceptorService } from './core/services/interceptor/auth-interceptor.service';
import { PrestationScreenComponent } from './pages/prestation-screen/prestation-screen.component';
import { PrestationCardDetailsComponent } from './component/prestation-card-details/prestation-card-details.component';

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
    AppointmentModalComponent,
    PrestationScreenComponent,
    PrestationCardDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BeholdWidgetComponent,
  ],

  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
