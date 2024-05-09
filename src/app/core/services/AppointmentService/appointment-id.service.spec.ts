import { TestBed } from '@angular/core/testing';

import { AppointmentIdService } from './appointment-id.service';

describe('AppointmentIdService', () => {
  let service: AppointmentIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
