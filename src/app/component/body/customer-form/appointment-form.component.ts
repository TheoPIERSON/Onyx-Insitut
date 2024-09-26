import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customers } from 'src/app/core/models/customerModel';
import { CustomerService } from 'src/app/core/services/customer.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent {
  public customers: Customers[] = [];

  passwordFieldType: string = 'password'; // Initialiser avec 'password'

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
  redirectToActivation() {
    this.router.navigate(['/activation']);
  }

  public onAddCustomer(addForm: NgForm): void {
    document.getElementById('add-customer-btn');
    // this.customerService.addCustomer(addForm.value).subscribe(
    //   (response: Customers) => {
    //     console.log(response);
    //     addForm.reset();
    //     this.redirectToActivation();
    //   },
    //   (error: HttpErrorResponse) => {
    //     alert(error.message);
    //     addForm.reset();
    //   }
    // );
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
