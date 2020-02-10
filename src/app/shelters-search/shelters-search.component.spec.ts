import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheltersSearchComponent } from './shelters-search.component';

describe('SheltersSearchComponent', () => {
  let component: SheltersSearchComponent;
  let fixture: ComponentFixture<SheltersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheltersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheltersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
