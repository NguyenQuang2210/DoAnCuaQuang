import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesonComponent } from './buseson.component';

describe('BusesonComponent', () => {
  let component: BusesonComponent;
  let fixture: ComponentFixture<BusesonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusesonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusesonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
