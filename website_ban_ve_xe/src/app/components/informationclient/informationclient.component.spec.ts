import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationclientComponent } from './informationclient.component';

describe('InformationclientComponent', () => {
  let component: InformationclientComponent;
  let fixture: ComponentFixture<InformationclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
