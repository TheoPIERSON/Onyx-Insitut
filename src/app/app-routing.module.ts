import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './component/body/body.component';
import { LoginComponent } from './pages/login-screen/login/login.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { ActivationFormComponent } from './pages/activation-form/activation-form.component';
import { PrestationScreenComponent } from './pages/prestation-screen/prestation-screen.component';
import { PasswordForgottenComponent } from './pages/login-screen/password-forgotten/password-forgotten.component';

export const routes: Routes = [
  { path: '', component: BodyComponent, data: { displaySidebar: false } },
  { path: 'login', component: LoginComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'activation', component: ActivationFormComponent },
  { path: 'prestation-detail', component: PrestationScreenComponent },
  { path: 'password-forgotten', component: PasswordForgottenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
