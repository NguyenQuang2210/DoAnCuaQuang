import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationticketComponent } from './informationticket.component';

describe('InformationticketComponent', () => {
  let component: InformationticketComponent;
  let fixture: ComponentFixture<InformationticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
