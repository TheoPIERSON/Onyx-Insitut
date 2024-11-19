import { Component } from '@angular/core';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.css',
})
export class PasswordForgottenComponent {
  passwordFieldType: string = 'password'; // Initialiser avec 'password'

  sendPasswordRequest(): void {}
  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
