import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangenamePage } from './changename.page';

describe('ChangenamePage', () => {
  let component: ChangenamePage;
  let fixture: ComponentFixture<ChangenamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangenamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangenamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
