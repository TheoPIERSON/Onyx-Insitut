import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/core/classes/appointmentClass';
import { Type_prestation } from 'src/app/core/classes/type_prestation_class';
import { Customers } from 'src/app/core/models/customerModel';
import { AppointmentService } from 'src/app/core/services/AppointmentService/appointment.service';
import { TypePrestationIdService } from 'src/app/core/services/Type_prestation/type-prestation-id.service';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css'],
})
export class AppointmentModalComponent implements OnInit {
  public customers: Customers[] = [];
  public latestAppointment: Appointment | undefined;

  selectedTypePrestation = new Type_prestation({
    id: this.typePrestationId.getSelectedTypePrestationId(),
    description: '',
    duration: 0,
    price: 0,
    title: '',
  });

  constructor(
    public matDialog: MatDialog,
    public typePrestationService: TypePrestationService,
    public typePrestationId: TypePrestationIdService,
    public appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    const typeId = this.selectedTypePrestation.id;
    console.log('ID de la presta in modal:', typeId);
    this.typePrestationService
      .findById(typeId)
      .subscribe((type: Type_prestation) => {
        this.selectedTypePrestation = type;
        console.log(
          'Titre de la prestation:',
          this.selectedTypePrestation.title
        );
      });
    this.getLastAppointment();
  }

  getTypePrestationId(typeId: number): void {
    this.typePrestationService.findById(typeId);
  }

  getLastAppointment(): void {
    this.appointmentService
      .getLatestAppointment()
      .subscribe((appointment: Appointment) => {
        this.latestAppointment = appointment;
        console.log('Dernier rendez-vous :', this.latestAppointment);
      });
  }

  getFormattedDate(): string {
    if (!this.latestAppointment) return '';
    const date = new Date(this.latestAppointment.appointmentStartDate);
    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
  }

  getFormattedStartTime(): string {
    if (!this.latestAppointment) return '';
    const date = new Date(this.latestAppointment.appointmentStartDate);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getFormattedEndTime(): string {
    if (!this.latestAppointment) return '';
    const date = new Date(this.latestAppointment.appointmentEndDate);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  public onValidation() {
    let idAppointment: number = this.latestAppointment?.id ?? 0;
    let idTypePrestation: number = this.selectedTypePrestation.id;
    console.log(idAppointment);
    console.log(idTypePrestation);

    this.appointmentService
      .assignPrestationToAppointment(idAppointment, idTypePrestation)
      .subscribe(
        (response) => {
          console.log('Prestation attribuée avec succès :', response);
          // Mettez à jour votre interface utilisateur ici si nécessaire
          location.reload();
          this.redirectToHomepage();
        },
        (error) => {
          console.error("Erreur lors de l'attribution de prestation :", error);
          // Gérer l'erreur ici (affichage d'un message d'erreur, etc.)
          location.reload();
        }
      );
  }
  redirectToHomepage() {
    this.router.navigate(['/']);
  }
}
