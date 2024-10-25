import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

@Component({
  selector: 'app-prestation-card-details',
  templateUrl: './prestation-card-details.component.html',
  styleUrls: ['./prestation-card-details.component.css'],
})
export class PrestationCardDetailsComponent implements OnInit {
  prestationsByType$:
    | Observable<{ [key: string]: TypePrestation[] }>
    | undefined;

  constructor(private typePrestationService: TypePrestationService) {}

  ngOnInit(): void {
    this.prestationsByType$ = this.getTypePrestation().pipe(
      map((prestations) => this.groupByType(prestations))
    );
  }

  private getTypePrestation(): Observable<TypePrestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }

  private groupByType(prestations: TypePrestation[]): {
    [key: string]: TypePrestation[];
  } {
    return prestations.reduce((acc, prestation) => {
      const type = prestation.type || 'Autres'; // Utilise une valeur par défaut si le type est manquant
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(prestation);
      return acc;
    }, {} as { [key: string]: TypePrestation[] });
  }
}
