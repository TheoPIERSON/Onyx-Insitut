import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { TypePrestation } from '../models/type_prestation';

@Injectable({
  providedIn: 'root',
})
export class TypePrestationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchTypePrestation(): Observable<TypePrestation[]> {
    return this.http.get<TypePrestation[]>(
      `${this.apiServerUrl}/type_prestation/all`
    );
  }
  public findById(id: number): Observable<TypePrestation> {
    return this.http.get<TypePrestation>(
      `${this.apiServerUrl}/type_prestation/${id}`
    );
  }
}
