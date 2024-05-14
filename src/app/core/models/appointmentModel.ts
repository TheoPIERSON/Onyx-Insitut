import { Customers } from './customerModel';

export interface Appointments {
  id: number;
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  customer: Customers;
}
