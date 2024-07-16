import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

@Component({
  selector: 'app-mon-travail',
  templateUrl: './mon-travail.component.html',
  styleUrls: ['./mon-travail.component.css'],
})
export class MonTravailComponent implements OnInit {
  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();

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

  redirectToPrestationScreen() {
    this.router.navigate(['/prestation-detail']);
  }
}
