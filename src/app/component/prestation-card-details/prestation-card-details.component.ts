import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  prestations: TypePrestation[] = [];
  type: string = '';

  constructor(
    private route: ActivatedRoute,
    private typePrestationService: TypePrestationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type') || '';
      this.loadPrestations();
    });
  }

  private loadPrestations() {
    this.typePrestationService.fetchTypePrestation().subscribe((data) => {
      this.prestations = data.filter(
        (prestation) => prestation.type === this.type
      );
    });
  }
}
