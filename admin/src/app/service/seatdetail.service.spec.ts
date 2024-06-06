import { TestBed } from '@angular/core/testing';

import { SeatdetailService } from './seatdetail.service';

describe('SeatdetailService', () => {
  let service: SeatdetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatdetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
