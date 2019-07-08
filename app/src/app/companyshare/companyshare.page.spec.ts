import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysharePage } from './companyshare.page';

describe('CompanysharePage', () => {
  let component: CompanysharePage;
  let fixture: ComponentFixture<CompanysharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
