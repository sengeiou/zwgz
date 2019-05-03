import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyrefundPage } from './applyrefund.page';

describe('ApplyrefundPage', () => {
  let component: ApplyrefundPage;
  let fixture: ComponentFixture<ApplyrefundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyrefundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyrefundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
