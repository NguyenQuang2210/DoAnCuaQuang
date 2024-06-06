import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenybillComponent } from './denybill.component';

describe('DenybillComponent', () => {
  let component: DenybillComponent;
  let fixture: ComponentFixture<DenybillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DenybillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DenybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
