import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  selectedPrestation: string | undefined; // Nouvelle propriété pour stocker la valeur de l'input prestation
  selectedDate: Date = new Date();
  dateToString: string = this.selectedDate.toLocaleDateString();
  selectedHour: string = '10:00';

  customerId: number = 0;
  customerFirstname: string = '';
  customerLastname: string = '';
  customerPhoneNumber: string = '';
  customerEmail: string = '';
  customerBirthdate: string = '';
  customerPassword: string = '';

  decodedToken: any; // Pour stocker les informations du JWT décrypté

  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();

  constructor(
    private typePrestationService: TypePrestationService,
    private typePrestationIdService: TypePrestationIdService,
    private customerService: CustomerService,
    private appointmentService: AppointmentService,
    public matDialog: MatDialog,
    private fb: FormBuilder
  ) {
    // Ajouter 3 mois à maxDate
    this.maxDate = new Date(this.minDate);
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }
  ngOnInit(): void {
    console.log(this.dateToString);

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      this.decodedToken = jwtDecode(accessToken); // Décoder le JWT
      console.log('Informations du JWT décryptées :', this.decodedToken.id);
    }
  }
  private getTypePrestation(): Observable<Type_prestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }

  public dateFilter = (date: any) => {
    const day = date.getDay();
    return day != 0 && day != 6;
  };

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  getCustomerById(id: string) {
    let idCustomer = this.decodedToken.id;
    // Appel du service pour trouver le client par son identifiant
    this.customerService.findCustomerById(idCustomer).subscribe((customer) => {
      console.log('Informations du client :', customer);
      // Assignation de l'ID du client à la variable customerId
      this.customerId = customer.id;
    });
  }

  onSubmit() {
    let selectedPrestationDuration: number = 0;
    let selectedPrestationId: number = 0;
    if (this.selectedPrestation) {
      // Séparation de la chaîne en utilisant le tiret comme délimiteur
      const parts = this.selectedPrestation.split('-');
      // Extrait le nombre au début de la chaîne et le convertit en entier
      selectedPrestationDuration = parseInt(parts[0], 10);
      selectedPrestationId = parseInt(parts[1]);
      // Utilisez selectedPrestationDuration comme bon vous semble
      console.log(selectedPrestationDuration); // Affiche 20
    } else {
      console.log("selectedPrestation n'est pas défini");
    }

    console.log('Date sélectionnée :', this.selectedDate);
    console.log('Heure sélectionnée :', this.selectedHour);

    // Construire la date de début
    let startDate: Date = new Date(this.selectedDate);
    if (this.selectedHour) {
      const [hours, minutes] = this.selectedHour.split(':');
      startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    }
    console.log('La date de début :', startDate);

    // Calculer la date de fin
    const endDate: Date = new Date(
      startDate.getTime() + selectedPrestationDuration * 60000
    ); // Convertir les minutes en millisecondes (1 minute = 60000 millisecondes)

    console.log('La date de fin :', endDate);

    // Appeler la méthode pour récupérer les informations du client
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
        this.openModal(); // Ouvrez la modale avec les informations du client
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(
      AppointmentModalComponent,
      dialogConfig
    );
  }
}
