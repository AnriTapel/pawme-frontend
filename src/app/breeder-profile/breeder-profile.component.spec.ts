import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederProfileComponent } from './breeder-profile.component';

describe('BreederProfileComponent', () => {
  let component: BreederProfileComponent;
  let fixture: ComponentFixture<BreederProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
