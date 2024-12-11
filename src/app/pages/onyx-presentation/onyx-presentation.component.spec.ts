import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnyxPresentationComponent } from './onyx-presentation.component';

describe('OnyxPresentationComponent', () => {
  let component: OnyxPresentationComponent;
  let fixture: ComponentFixture<OnyxPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnyxPresentationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnyxPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
