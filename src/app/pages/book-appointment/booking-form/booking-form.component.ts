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
import {
  TimeSlot,
  TimeSlotService,
} from 'src/app/core/services/TimeSlotService/time-slot.service';

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
  availableSlots: TimeSlot[] = []; // Ajouté pour stocker les créneaux disponibles

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

  typePrestation$: Observable<Type_prestation[]> =
    this.getTypePrestation().pipe(
      map((prestations) =>
        prestations.sort((a, b) => {
          if (a.type !== b.type) {
            return a.type.localeCompare(b.type); // Tri par type
          }
          return a.title.localeCompare(b.title); // Tri alphabétique si même type
        })
      )
    );
  appointments$: Observable<Appointments[]> = this.getAppointments();

  constructor(
    private typePrestationService: TypePrestationService,
    private typePrestationIdService: TypePrestationIdService,
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    private availableTimeSlotService: TimeSlotService, // Ajout du service TimeSlot
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
    console.log('Date sélectionnée :', date);
    this.selectedDate = date;
    this.selectedHour = null;

    // Formater la date en chaîne YYYY-MM-DD pour l'API
    const dateStr = date.toISOString().split('T')[0];

    // Récupérer les créneaux disponibles pour cette date
    this.availableTimeSlotService.getAvailableSlots(dateStr).subscribe(
      (slots) => {
        this.availableSlots = slots;
        console.log('Créneaux disponibles (détaillés):', JSON.stringify(slots));

        // Récupérer également les rendez-vous existants
        this.loadExistingAppointments(date);
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des créneaux disponibles',
          error
        );
        // En cas d'erreur, vider la liste des créneaux disponibles
        this.availableSlots = [];
        // Continuer avec la récupération des rendez-vous existants
        this.loadExistingAppointments(date);
      }
    );
  }

  loadExistingAppointments(date: Date) {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    this.appointmentService
      .findByDate(startDate.toISOString(), endDate.toISOString())
      .subscribe(
        (appointments: any[]) => {
          if (appointments.length > 0) {
            this.takenHours = appointments.map((appointment) => {
              const appointmentStartDate = new Date(
                appointment.appointmentStartDate
              );
              const appointmentEndDate = new Date(
                appointment.appointmentEndDate
              );

              const startHour = appointmentStartDate
                .toTimeString()
                .substring(0, 5);
              const endHour = appointmentEndDate.toTimeString().substring(0, 5);

              console.log(`Rendez-vous de ${startHour} à ${endHour}`);

              return { start: startHour, end: endHour };
            });
          } else {
            this.takenHours = [];
          }
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des rendez-vous',
            error
          );
        }
      );
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    const modalDialog = this.matDialog.open(
      AppointmentModalComponent,
      dialogConfig
    );
  }

  // Vérification si un créneau est disponible en tenant compte des deux contraintes:
  // 1. Le créneau doit être disponible selon les règles définies par l'administrateur
  // 2. Le créneau ne doit pas être déjà pris par un autre rendez-vous
  isHourAvailable(hour: string): boolean {
    // Vérifier si la journée entière est disponible
    const isDayAvailable = this.availableSlots.some(
      (slot) => slot.hour === null
    );

    // Vérifier si l'heure spécifique est disponible
    const isHourSpecificallyAvailable = this.availableSlots.some(
      (slot) => slot.hour === hour
    );

    // Si ni la journée ni l'heure spécifique ne sont disponibles, retourner false
    if (!isDayAvailable && !isHourSpecificallyAvailable) {
      return false;
    }

    // Maintenant, vérifier si l'heure n'est pas déjà prise par un rendez-vous
    const [hourStart, minuteStart] = hour.split(':').map(Number);
    const start = new Date(this.selectedDate);
    start.setHours(hourStart, minuteStart, 0, 0);

    const end = new Date(start);
    if (this.selectedPrestation) {
      const parts = this.selectedPrestation.split('-');
      const duration = parseInt(parts[0], 10);
      end.setMinutes(start.getMinutes() + duration);
    } else {
      // Utiliser la durée par défaut si aucune prestation n'est sélectionnée
      end.setMinutes(start.getMinutes() + 30); // 30 minutes par défaut
    }

    // Vérifier les chevauchements avec les rendez-vous existants
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

  hasAvailableSlots(): boolean {
    return this.availableSlots.length > 0;
  }

  isFormValid(): boolean {
    return (
      !!this.selectedPrestation && !!this.selectedDate && !!this.selectedHour
    );
  }
}
