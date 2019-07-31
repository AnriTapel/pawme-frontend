import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederLandingComponent } from './breeder-landing.component';

describe('BreederLandingComponent', () => {
  let component: BreederLandingComponent;
  let fixture: ComponentFixture<BreederLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
