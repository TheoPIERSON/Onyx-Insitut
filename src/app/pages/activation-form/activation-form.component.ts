import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Customers } from 'src/app/core/models/customerModel';

import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-activation-form',
  templateUrl: './activation-form.component.html',
  styleUrls: ['./activation-form.component.css'],
})
export class ActivationFormComponent {
  public customer: Customers[] = [];

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  search = this.fb.nonNullable.group({
    code: '',
  });

  redirectToActivation() {
    this.router.navigate(['/login']);
  }

  redirectToHomepage() {
    this.router.navigate(['/']);
  }
  //Ajoute le nouvel appointment dans la base de données
  public onValidation(): void {
    const actualCode: string = this.search.value.code ?? '000000';
    console.log(actualCode);

    this.customerService.activateAccount(actualCode).subscribe(
      (response: Customers) => {
        // Gérer la redirection ici si la réponse est réussie
        this.redirectToActivation();
      },
      (error) => {
        // Gérer les erreurs ici
        console.error("Erreur lors de l'activation du compte :", error);
      }
    );
  }
}
