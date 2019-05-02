import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationrecordPage } from './valuationrecord.page';

describe('ValuationrecordPage', () => {
  let component: ValuationrecordPage;
  let fixture: ComponentFixture<ValuationrecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationrecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationrecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
