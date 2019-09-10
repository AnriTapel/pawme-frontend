import { TestBed } from '@angular/core/testing';

import { DogCardService } from './dog-card.service';

describe('DogCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DogCardService = TestBed.get(DogCardService);
    expect(service).toBeTruthy();
  });
});
