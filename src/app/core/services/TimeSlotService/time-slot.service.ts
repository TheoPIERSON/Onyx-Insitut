import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

export interface TimeSlot {
  id: number;
  date: string; // format 'YYYY-MM-DD'
  hour: string | null; // '14:00' ou null si journée entière bloquée
}

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  private apiServerUrl = environment.apiBaseUrl;
  private baseUrl = '/api/available-slots'; // adapté à votre nouvel endpoint Spring Boot
  private slotUrl = this.apiServerUrl + this.baseUrl;

  constructor(private http: HttpClient) {}

  getAvailableSlots(date: string): Observable<TimeSlot[]> {
    return this.http.get<TimeSlot[]>(`${this.slotUrl}?date=${date}`);
  }

  checkSlotAvailability(date: string, hour: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.slotUrl}/check?date=${date}&hour=${hour}`
    );
  }

  makeHourAvailable(date: string, hour: string): Observable<TimeSlot> {
    return this.http.post<TimeSlot>(
      `${this.slotUrl}/hour?date=${date}&hour=${hour}`,
      {}
    );
  }

  makeDayAvailable(date: string): Observable<TimeSlot> {
    return this.http.post<TimeSlot>(`${this.slotUrl}/day?date=${date}`, {});
  }

  makeDayUnavailable(date: string): Observable<void> {
    return this.http.delete<void>(`${this.slotUrl}/unavailable`, {
      params: { date },
    });
  }

  makeSlotUnavailable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.slotUrl}/${id}`);
  }
}
