import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverformComponent } from './driverform.component';

describe('DriverformComponent', () => {
  let component: DriverformComponent;
  let fixture: ComponentFixture<DriverformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
