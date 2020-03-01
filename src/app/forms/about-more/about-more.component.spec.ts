import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMoreComponent } from './about-more.component';

describe('AboutMoreComponent', () => {
  let component: AboutMoreComponent;
  let fixture: ComponentFixture<AboutMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
