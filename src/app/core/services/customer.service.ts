import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  public fetchCustomers(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiServerUrl}/customer/all`);
  }

  public findCustomerById(id: number): Observable<Customers> {
    return this.http.get<Customers>(`${this.apiServerUrl}/customer/${id}`);
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
  public activateAccount(code: string): Observable<Customers> {
    const activation = { code: code };
    console.log(activation);
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customer/activate`,
      activation
    );
  }
  public askNewPassword(email: string): Observable<Customers> {
    return this.http.post<Customers>(
      `${this.apiServerUrl}/customer/forgot-password`,
      { email }
    );
  }
}
