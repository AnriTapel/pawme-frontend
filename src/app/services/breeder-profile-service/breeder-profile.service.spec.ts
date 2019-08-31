import { TestBed } from '@angular/core/testing';

import { BreederProfileService } from './breeder-profile.service';

describe('BreederProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreederProfileService = TestBed.get(BreederProfileService);
    expect(service).toBeTruthy();
  });
});
