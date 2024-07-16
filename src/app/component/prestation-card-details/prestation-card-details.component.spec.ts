import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationCardDetailsComponent } from './prestation-card-details.component';

describe('PrestationCardDetailsComponent', () => {
  let component: PrestationCardDetailsComponent;
  let fixture: ComponentFixture<PrestationCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationCardDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
