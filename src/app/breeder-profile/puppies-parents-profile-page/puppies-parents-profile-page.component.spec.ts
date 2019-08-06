import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppiesParentsProfilePageComponent } from './puppies-parents-profile-page.component';

describe('PuppiesParentsProfilePageComponent', () => {
  let component: PuppiesParentsProfilePageComponent;
  let fixture: ComponentFixture<PuppiesParentsProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuppiesParentsProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuppiesParentsProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
