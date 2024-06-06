import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesformComponent } from './busesform.component';

describe('BusesformComponent', () => {
  let component: BusesformComponent;
  let fixture: ComponentFixture<BusesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusesformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
