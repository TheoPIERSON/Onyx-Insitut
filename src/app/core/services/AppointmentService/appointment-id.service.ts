import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppointmentIdService {
  private selectedAppointmentId: number = 0;

  setSelectedAppointmentId(id: number): void {
    this.selectedAppointmentId = id;
  }

  getSelectedAppointmentId(): number {
    return this.selectedAppointmentId;
  }
}
