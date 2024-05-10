import { TestBed } from '@angular/core/testing';

import { TypePrestationIdService } from './type-prestation-id.service';

describe('TypePrestationIdService', () => {
  let service: TypePrestationIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePrestationIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
