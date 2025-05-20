import { TestBed } from '@angular/core/testing';

import { TimeSlotService } from './time-slot.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TimeSlotService', () => {
  let service: TimeSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // <-- ajoute ceci
    });
    service = TestBed.inject(TimeSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
