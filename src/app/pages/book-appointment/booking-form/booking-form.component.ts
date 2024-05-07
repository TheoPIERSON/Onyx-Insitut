import { Component, Inject, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

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

  constructor(
    private typePrestationService: TypePrestationService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl
  ) {
    // Créer une copie de minDate pour éviter de modifier la date d'origine
    this.maxDate = new Date(this.minDate);
    // Ajouter 3 mois à maxDate
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
  }
  ngOnInit(): void {
    console.log('utilisateur connecté : ');
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
