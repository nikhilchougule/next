import { TestBed } from '@angular/core/testing';

import { ScipService } from './scip.service';

describe('ScipService', () => {
  let service: ScipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
