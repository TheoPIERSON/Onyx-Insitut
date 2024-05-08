import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';
import { jwtDecode } from 'jwt-decode';

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
  selectedHour: string | undefined;

  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();

  constructor(private typePrestationService: TypePrestationService) {
    // Créer une copie de minDate pour éviter de modifier la date d'origine
    this.maxDate = new Date(this.minDate);
    // Ajouter 3 mois à maxDate
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }
  ngOnInit(): void {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      console.log('JWT récupéré depuis localStorage :', accessToken);
    } else {
      console.log('Aucun JWT trouvé dans localStorage');
    }
  }

  private getTypePrestation(): Observable<TypePrestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }

  public dateFilter = (date: any) => {
    const day = date.getDay();
    return day != 0 && day != 6;
  };

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  onSubmit() {
    // Afficher la valeur de l'input prestation dans la console
    console.log('Prestation sélectionnée :', this.selectedPrestation);
    console.log('Date sélectionnée :', this.selectedDate);
    console.log('Heure sélectionnée :', this.selectedHour);
  }
}
