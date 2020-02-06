import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstMessageComponent } from './first-message.component';

describe('FirstMessageComponent', () => {
  let component: FirstMessageComponent;
  let fixture: ComponentFixture<FirstMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
