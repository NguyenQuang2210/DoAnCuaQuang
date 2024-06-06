import { TestBed } from '@angular/core/testing';

import { DriverserviceService } from './driverservice.service';

describe('DriverserviceService', () => {
  let service: DriverserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
