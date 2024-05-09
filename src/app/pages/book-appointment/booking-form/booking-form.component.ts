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

  decodedToken: any; // Pour stocker les informations du JWT décrypté

  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();

  constructor(
    private typePrestationService: TypePrestationService,
    private customerService: CustomerService,
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
    this.customerService.findCustomerById(idCustomer);
  }

  onSubmit() {
    console.log('Prestation sélectionnée :', this.selectedPrestation);
    // console.log('Date sélectionnée :', this.selectedDate);
    // console.log('Heure sélectionnée :', this.selectedHour);

    // // Construire la date de début
    // let startDate: Date = new Date(this.selectedDate);
    // if (this.selectedHour) {
    //   const [hours, minutes] = this.selectedHour.split(':');
    //   startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    // }
    // console.log('La date de début :', startDate);

    // // Calculer la date de fin
    // const endDate: Date = new Date(startDate.getTime());
    // const durationInMilliseconds =
    //   this.selectedTypePrestation.duration * 60 * 1000; // Convertir la durée en minutes en millisecondes
    // endDate.setTime(endDate.getTime() + durationInMilliseconds);
    // console.log('La date de fin :', endDate);
  }

  // public onAddAppointment(): void {

  //   const appointmentObj: Appointments = {
  //     id: 0,
  //     appointmentStartDate: this.se,
  //     appointmentEndDate: endDate,
  //     customer: {
  //       id: this.selectedCustomer.id,
  //       firstname: this.selectedCustomer.firstname,
  //       lastname: this.selectedCustomer.lastname,
  //       phoneNumber: this.selectedCustomer.phoneNumber,
  //       email: this.selectedCustomer.email,
  //       birthdate: this.selectedCustomer.birthdate,
  //     },
  //   };

  //   this.appointmentService
  //     .addAppointment(appointmentObj)
  //     .subscribe((response: Appointments) => {});
  //   this.typePrestationService
  //     .findById(this.selectedTypePrestation.id)
  //     .subscribe(
  //       (res: TypePrestation) => {
  //         this.selectedTypePrestation = res;
  //         this.typePrestationIdService.setSelectedTypePrestationId(
  //           this.selectedTypePrestation.id
  //         );
  //         this.openModal(); // Ouvrez la modale avec les informations du client
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.error(error);
  //       }
  //     );
  // }
}
