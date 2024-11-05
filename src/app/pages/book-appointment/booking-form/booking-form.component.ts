import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';
import { jwtDecode } from 'jwt-decode';
import { CustomerService } from 'src/app/core/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Appointments } from 'src/app/core/models/appointmentModel';
import { Type_prestation } from 'src/app/core/classes/type_prestation_class';
import { FormBuilder } from '@angular/forms';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { TypePrestationIdService } from 'src/app/core/services/Type_prestation/type-prestation-id.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  minDate: Date = new Date();
  maxDate: Date;
  selectedPrestation: string | undefined;
  selectedDate: Date = new Date();
  dateToString: string = this.selectedDate.toLocaleDateString();
  selectedHour: string | null = null; // Modifié pour accepter null
  takenHours: { start: string; end: string }[] = [];

  customerId: number = 0;
  customerFirstname: string = '';
  customerLastname: string = '';
  customerPhoneNumber: string = '';
  customerEmail: string = '';
  customerBirthdate: string = '';
  customerPassword: string = '';

  selectedTypePrestation = new Type_prestation({
    id: 0,
    title: '',
    description: '',
    duration: 0,
    price: 0,
    type: '',
  });

  decodedToken: any;
  isFormIncomplete: boolean = false; // Nouveau boolean pour afficher l'erreur

  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();
  appointments$: Observable<Appointments[]> = this.getAppointments();

  constructor(
    private typePrestationService: TypePrestationService,
    private typePrestationIdService: TypePrestationIdService,
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    public matDialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.maxDate = new Date(this.minDate);
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }

  ngOnInit(): void {
    console.log(this.dateToString);

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.decodedToken = jwtDecode(accessToken);
      console.log('Informations du JWT décryptées :', this.decodedToken.id);
    }
  }

  private getTypePrestation(): Observable<Type_prestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }

  private getAppointments(): Observable<Appointments[]> {
    return this.appointmentService.fetchAppointments();
  }

  public dateFilter = (date: any) => {
    const day = date.getDay();
    return day != 0 && day != 6;
  };

  selectHour(hour: string): void {
    if (this.isHourAvailable(hour)) {
      this.selectedHour = hour;
    }
  }

  isHourSelected(hour: string): boolean {
    return this.selectedHour === hour;
  }

  getCustomerById(id: string) {
    let idCustomer = this.decodedToken.id;
    this.customerService.findCustomerById(idCustomer).subscribe((customer) => {
      console.log('Informations du client :', customer);
      this.customerId = customer.id;
    });
  }

  onSubmit() {
    if (!this.isFormValid()) {
      console.log("Le formulaire n'est pas complet.");
      this.isFormIncomplete = true; // Active l'affichage du message d'erreur
      return;
    }
    this.isFormIncomplete = false; // Active l'affichage du message d'erreur

    let selectedPrestationDuration: number = 0;
    let selectedPrestationId: number = 0;
    if (this.selectedPrestation) {
      const parts = this.selectedPrestation.split('-');
      selectedPrestationDuration = parseInt(parts[0], 10);
      selectedPrestationId = parseInt(parts[1]);
      console.log(selectedPrestationDuration);
    } else {
      console.log("selectedPrestation n'est pas défini");
    }

    console.log('Date sélectionnée :', this.selectedDate);
    console.log('Heure sélectionnée :', this.selectedHour);

    let startDate: Date = new Date(this.selectedDate);
    if (this.selectedHour) {
      const [hours, minutes] = this.selectedHour.split(':');
      startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    }
    console.log('La date de début :', startDate);

    const endDate: Date = new Date(
      startDate.getTime() + selectedPrestationDuration * 60000
    );

    console.log('La date de fin :', endDate);

    this.getCustomerById(this.decodedToken.id);
    let selectedCustomerId = this.customerId;
    let selectedCustomerFirstname = this.customerFirstname;
    let selectedCustomerLastname = this.customerLastname;
    let selectedCustomerPhoneNumber = this.customerPhoneNumber;
    let selectedCustomerEmail = this.customerEmail;
    let selectedCustomerBirthdate = this.customerBirthdate;
    let selectedCustomerPassword = this.customerPassword;

    const appointmentObj: Appointments = {
      id: 0,
      appointmentStartDate: startDate,
      appointmentEndDate: endDate,
      customer: {
        id: selectedCustomerId,
        firstname: selectedCustomerFirstname,
        lastname: selectedCustomerLastname,
        phoneNumber: selectedCustomerPhoneNumber,
        email: selectedCustomerEmail,
        birthdate: selectedCustomerBirthdate,
        password: selectedCustomerPassword,
      },
    };
    this.appointmentService
      .addAppointment(appointmentObj)
      .subscribe((response: Appointments) => {});

    this.typePrestationService.findById(selectedPrestationId).subscribe(
      (res: TypePrestation) => {
        this.typePrestationIdService.setSelectedTypePrestationId(
          selectedPrestationId
        );
        this.openModal();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  onDateChange(date: Date) {
    const twentyHoursInMilliseconds = 20 * 60 * 60 * 1000;
    console.log('Date sélectionnée :', date);

    const startDate: string = date.toISOString();
    const endDate: Date = new Date(date.getTime() + twentyHoursInMilliseconds);
    const endDateStr: string = endDate.toISOString();

    this.appointmentService.findByDate(startDate, endDateStr);
    this.isThereAppointmentOnDate(startDate, endDateStr);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    const modalDialog = this.matDialog.open(
      AppointmentModalComponent,
      dialogConfig
    );
  }

  isThereAppointmentOnDate(startDate: string, endDate: string) {
    this.appointmentService.findByDate(startDate, endDate).subscribe(
      (appointments: any[]) => {
        if (appointments.length === 0) {
          console.log('Aucun rdv à cette date');
        } else {
          this.takenHours = appointments.map((appointment) => {
            const appointmentStartDate = new Date(
              appointment.appointmentStartDate
            );
            const appointmentEndDate = new Date(appointment.appointmentEndDate);

            const startHour = appointmentStartDate
              .toTimeString()
              .substring(0, 5);
            const endHour = appointmentEndDate.toTimeString().substring(0, 5);

            console.log(`Rendez-vous de ${startHour} à ${endHour}`);

            return { start: startHour, end: endHour };
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des rendez-vous', error);
      }
    );
  }

  isHourAvailable(hour: string): boolean {
    const [hourStart, minuteStart] = hour.split(':').map(Number);
    const start = new Date(this.selectedDate);
    start.setHours(hourStart, minuteStart, 0, 0);

    const end = new Date(start);
    end.setMinutes(start.getMinutes() + this.selectedTypePrestation.duration);

    for (const interval of this.takenHours) {
      const [hourIntervalStart, minuteIntervalStart] = interval.start
        .split(':')
        .map(Number);
      const [hourIntervalEnd, minuteIntervalEnd] = interval.end
        .split(':')
        .map(Number);

      const intervalStart = new Date(this.selectedDate);
      intervalStart.setHours(hourIntervalStart, minuteIntervalStart, 0, 0);

      const intervalEnd = new Date(this.selectedDate);
      intervalEnd.setHours(hourIntervalEnd, minuteIntervalEnd, 0, 0);

      // Vérification si le créneau proposé chevauche un autre rendez-vous
      if (
        (start >= intervalStart && start < intervalEnd) ||
        (end > intervalStart && end <= intervalEnd) ||
        (start <= intervalStart && end >= intervalEnd)
      ) {
        return false;
      }
    }

    return true;
  }
  isFormValid(): boolean {
    return (
      !!this.selectedPrestation && !!this.selectedDate && !!this.selectedHour
    );
  }
}
