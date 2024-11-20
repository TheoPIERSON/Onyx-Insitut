import { Component } from '@angular/core';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.css',
})
export class PasswordForgottenComponent {
  constructor(private customerService: CustomerService) {}

  sendPasswordRequest(email: string): void {
    console.log('Sending request with email:', email);

    this.customerService.askNewPassword(email).subscribe({
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
