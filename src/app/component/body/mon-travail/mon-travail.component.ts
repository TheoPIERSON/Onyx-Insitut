import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

@Component({
  selector: 'app-mon-travail',
  templateUrl: './mon-travail.component.html',
  styleUrls: ['./mon-travail.component.css'],
})
export class MonTravailComponent {
  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();

  constructor(private typePrestationService: TypePrestationService) {}

  private getTypePrestation(): Observable<TypePrestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }
}
