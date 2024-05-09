import { Customers } from './customerModel';
import { TypePrestation } from './type_prestation';

export interface Appointments {
  id: number;
  appointmentStartDate: Date;
  appointmentEndDate: Date;
  customer: Customers;
}
