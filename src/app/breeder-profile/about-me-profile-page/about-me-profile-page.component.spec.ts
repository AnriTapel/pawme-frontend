import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeProfilePageComponent } from './about-me-profile-page.component';

describe('AboutMeProfilePageComponent', () => {
  let component: AboutMeProfilePageComponent;
  let fixture: ComponentFixture<AboutMeProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
