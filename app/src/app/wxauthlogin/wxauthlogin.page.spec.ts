import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WxauthloginPage } from './wxauthlogin.page';

describe('WxauthloginPage', () => {
  let component: WxauthloginPage;
  let fixture: ComponentFixture<WxauthloginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WxauthloginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WxauthloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
