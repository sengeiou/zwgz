import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsuccessPage } from './refundsuccess.page';

describe('RefundsuccessPage', () => {
  let component: RefundsuccessPage;
  let fixture: ComponentFixture<RefundsuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundsuccessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundsuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
