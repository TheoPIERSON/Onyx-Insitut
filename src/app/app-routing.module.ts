import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './component/body/body.component';
import { LoginComponent } from './pages/login-screen/login/login.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';

export const routes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
