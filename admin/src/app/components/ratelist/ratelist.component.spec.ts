import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatelistComponent } from './ratelist.component';

describe('RatelistComponent', () => {
  let component: RatelistComponent;
  let fixture: ComponentFixture<RatelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatelistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
