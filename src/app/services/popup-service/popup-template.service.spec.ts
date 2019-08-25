import { TestBed } from '@angular/core/testing';

import { PopupTemplateService } from './popup-template.service';

describe('PopupTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopupTemplateService = TestBed.get(PopupTemplateService);
    expect(service).toBeTruthy();
  });
});
