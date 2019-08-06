import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPuppiesProfilePageComponent } from './about-puppies-profile-page.component';

describe('AboutPuppiesProfilePageComponent', () => {
  let component: AboutPuppiesProfilePageComponent;
  let fixture: ComponentFixture<AboutPuppiesProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPuppiesProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPuppiesProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
