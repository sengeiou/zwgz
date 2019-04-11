import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileloginPage } from './mobilelogin.page';

describe('MobileloginPage', () => {
  let component: MobileloginPage;
  let fixture: ComponentFixture<MobileloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileloginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
