import { TestBed } from '@angular/core/testing';

import { NotificationBarService } from './notification-bar.service';

describe('NotificationBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationBarService = TestBed.get(NotificationBarService);
    expect(service).toBeTruthy();
  });
});
