import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Appointments } from '../../models/appointmentModel';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public fetchAppointments(): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(
      `${this.apiServerUrl}/appointment/all`
    );
  }
  public addAppointment(appointment: Appointments): Observable<Appointments> {
    return this.http.post<Appointments>(
      `${this.apiServerUrl}/appointment/add`,
      appointment
    );
  }
  public findById(id: number): Observable<Appointments> {
    return this.http.get<Appointments>(
      `${this.apiServerUrl}/appointment/${id}`
    );
  }

  findByDate(startDate: string, endDate: string): Observable<Appointments[]> {
    const params = {
      startDate: startDate,
      endDate: endDate,
    };

    return this.http.get<Appointments[]>(
      `${this.apiServerUrl}/appointment/between_date`,
      {
        params: params,
      }
    );
  }

  public getLatestAppointment(): Observable<Appointments> {
    return this.http.get<Appointments>(
      `${this.apiServerUrl}/appointment/latest`
    );
  }

  assignPrestationToAppointment(
    idAppointment: number,
    idTypePrestation: number
  ): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiServerUrl}/appointment/${idAppointment}/type-prestation/${idTypePrestation}`,
        null
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError('Something went wrong; please try again later.');
  }
}
