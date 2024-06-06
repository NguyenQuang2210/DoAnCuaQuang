import { TestBed } from '@angular/core/testing';

import { RateServiceService } from './rateservice.service';

describe('RateserviceService', () => {
  let service: RateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
