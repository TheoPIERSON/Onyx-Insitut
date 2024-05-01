import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Customers } from '../models/customerModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public addCustomer(customer: Customers): Observable<Customers> {
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customer/add`,
      customer
    );
  }
  public connectCustomer(
    username: string,
    password: string
  ): Observable<{ bearer: string }> {
    const credentials = { username, password };

    return this.http.post<{ bearer: string }>(
      `${this.apiServerUrl}/customer/connexion`,
      credentials
    );
  }
}
