import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TypePrestationIdService {
  private selectedTypePrestationId: number = 0;

  setSelectedTypePrestationId(id: number): void {
    this.selectedTypePrestationId = id;
  }

  getSelectedTypePrestationId(): number {
    return this.selectedTypePrestationId;
  }
}
