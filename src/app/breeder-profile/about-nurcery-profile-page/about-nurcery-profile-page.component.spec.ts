import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNurceryProfilePageComponent } from './about-nurcery-profile-page.component';

describe('AboutNurceryProfilePageComponent', () => {
  let component: AboutNurceryProfilePageComponent;
  let fixture: ComponentFixture<AboutNurceryProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutNurceryProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutNurceryProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
