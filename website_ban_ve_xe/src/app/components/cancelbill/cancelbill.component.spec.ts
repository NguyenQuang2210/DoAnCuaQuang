import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelbillComponent } from './cancelbill.component';

describe('CancelbillComponent', () => {
  let component: CancelbillComponent;
  let fixture: ComponentFixture<CancelbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelbillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
