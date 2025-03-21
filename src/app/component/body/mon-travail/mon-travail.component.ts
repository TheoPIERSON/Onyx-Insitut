import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Type_prestation } from 'src/app/core/classes/type_prestation_class';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

@Component({
  selector: 'app-mon-travail',
  templateUrl: './mon-travail.component.html',
  styleUrls: ['./mon-travail.component.css'],
})
export class MonTravailComponent implements OnInit {
  typePrestationGrouped$: Observable<Record<string, Type_prestation[]>> =
    this.getTypePrestation().pipe(
      map((prestations) =>
        prestations.reduce((acc, prestation) => {
          if (!acc[prestation.type]) {
            acc[prestation.type] = [];
          }
          acc[prestation.type].push(prestation);
          return acc;
        }, {} as Record<string, Type_prestation[]>)
      )
    );

  constructor(
    private typePrestationService: TypePrestationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getTypePrestation().subscribe(
      (data) => {
        console.log(data); // Affiche les données dans la console
      },
      (error) => {
        console.error(error); // Affiche les erreurs dans la console s'il y en a
      }
    );
  }

  private getTypePrestation(): Observable<TypePrestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }

  redirectToPrestationScreen(type: string) {
    this.router.navigate(['/prestation-detail', type]);
  }
  // Dans votre composant TypeScript
  getImagePath(typeKey: string): string {
    // Mappez chaque type à son image correspondante
    const imageMap: { [key: string]: string } = {
      mains: '../../../assets/images/nails.png',
      pieds: '../../../assets/images/foot.png',
      visage: '../../../assets/images/face.png',
      regard: '../../../assets/images/eyes.png',

      // Ajoutez tous vos types ici
    };

    // Retournez l'image correspondante ou une image par défaut
    return (
      imageMap[typeKey.toLowerCase()] || '../../../assets/images/nails.png'
    );
  }
}
