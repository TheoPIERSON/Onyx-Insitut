import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationScreenComponent } from './prestation-screen.component';

describe('PrestationScreenComponent', () => {
  let component: PrestationScreenComponent;
  let fixture: ComponentFixture<PrestationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrestationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
