import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederMessageComponent } from './breeder-message.component';

describe('BreederMessageComponent', () => {
  let component: BreederMessageComponent;
  let fixture: ComponentFixture<BreederMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
