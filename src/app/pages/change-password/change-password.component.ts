import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  passwordFieldType: string = 'password'; // Contrôle de la visibilité des mots de passe
  token: string = ''; // Récupérer le token depuis l'URL ou autre source
  password: string = ''; // Nouveau mot de passe
  confirmPassword: string = ''; // Confirmation du mot de passe

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupération du token depuis l'URL
    this.token = this.route.snapshot.paramMap.get('token') || 'tokenpastrouve';
    console.log(this.token);
  }

  changePassword(): void {
    if (this.password !== this.confirmPassword) {
      console.log('Les mots de passe ne correspondent pas.');
      return;
    }

    this.customerService.updatePassword(this.token, this.password).subscribe({
      next: (response) => {
        console.log('Mot de passe mis à jour:', response);
        this.redirectToLogin();
      },
      error: (error) => {
        console.log('Une erreur est survenue:', error);
      },
    });
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
