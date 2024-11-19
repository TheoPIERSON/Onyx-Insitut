import { Component } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.css',
})
export class PasswordForgottenComponent {
  constructor(private customerService: CustomerService) {}

  sendPasswordRequest(username: string): void {
    this.customerService.askNewPassword(username).subscribe({
      next: (response) => {
        console.log('Email found:', response);
        alert('Un email de réinitialisation a été envoyé.');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Adresse email non trouvée.');
      },
    });
  }
}
