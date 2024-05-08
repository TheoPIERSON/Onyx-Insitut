import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  login(username: string, password: string): void {
    this.customerService.connectCustomer(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.bearer); // Stocker le JWT
        console.log(response.bearer);

        // Décoder le JWT et afficher ses informations dans la console
        const decodedToken = jwtDecode(response.bearer);
        console.log('Informations du JWT décryptées :', decodedToken);

        this.router.navigate(['book-appointment']);
      },
      error: (err) => {
        console.error(err);
        console.log("le token, l'email ou le password est invalide");
      },
    });
  }
}
