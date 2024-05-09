import { Customers } from '../models/customerModel';

export class Appointment {
  id: number;
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  customer: Customers;

  constructor(data: any) {
    this.id = data.id;
    this.appointmentStartDate = data.appointmentStartDate;
    this.appointmentEndDate = data.appointmentEndDate;
    this.customer = data.customer;
  }
}
