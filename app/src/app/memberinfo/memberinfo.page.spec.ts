import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberinfoPage } from './memberinfo.page';

describe('MemberinfoPage', () => {
  let component: MemberinfoPage;
  let fixture: ComponentFixture<MemberinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
