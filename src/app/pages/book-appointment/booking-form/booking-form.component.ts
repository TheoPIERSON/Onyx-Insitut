import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePrestation } from 'src/app/core/models/type_prestation';
import { TypePrestationService } from 'src/app/core/services/type-prestation.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent {
  typePrestation$: Observable<TypePrestation[]> = this.getTypePrestation();

  constructor(private typePrestationService: TypePrestationService) {}

  private getTypePrestation(): Observable<TypePrestation[]> {
    return this.typePrestationService.fetchTypePrestation();
  }
}
