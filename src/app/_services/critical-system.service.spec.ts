import { TestBed } from '@angular/core/testing';

import { CriticalSystemService } from './critical-system.service';

describe('CriticalSystemService', () => {
  let service: CriticalSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriticalSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
