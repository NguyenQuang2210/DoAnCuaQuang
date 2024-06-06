import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuseslistComponent } from './buseslist.component';

describe('BuseslistComponent', () => {
  let component: BuseslistComponent;
  let fixture: ComponentFixture<BuseslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuseslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuseslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
