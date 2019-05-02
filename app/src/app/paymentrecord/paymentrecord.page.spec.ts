import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentrecordPage } from './paymentrecord.page';

describe('PaymentrecordPage', () => {
  let component: PaymentrecordPage;
  let fixture: ComponentFixture<PaymentrecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentrecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentrecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
