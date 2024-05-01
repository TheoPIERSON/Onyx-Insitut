import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';

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
        localStorage.setItem('access_token', response.bearer);
        console.log(response.bearer);
        this.router.navigate(['book-appointment']);
        // rediriger l'utilisateur vers la page d'accueil ou une autre page sécurisée
      },
      error: (err) => {
        console.error(err);
        console.log("le token, l'email ou le password est invalide");
        // afficher un message d'erreur à l'utilisateur
      },
    });
  }
}
