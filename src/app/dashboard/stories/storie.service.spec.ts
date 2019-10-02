import { TestBed } from '@angular/core/testing';

import { StorieService } from './storie.service';

describe('StorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorieService = TestBed.get(StorieService);
    expect(service).toBeTruthy();
  });
});
