import { TestBed } from '@angular/core/testing';

import { BusesserviceService } from './busesservice.service';

describe('BusesserviceService', () => {
  let service: BusesserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusesserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
