import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPuppyProfilePageComponent } from './add-puppy-profile-page.component';

describe('AddPuppyProfilePageComponent', () => {
  let component: AddPuppyProfilePageComponent;
  let fixture: ComponentFixture<AddPuppyProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPuppyProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPuppyProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
