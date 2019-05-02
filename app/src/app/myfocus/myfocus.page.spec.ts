import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfocusPage } from './myfocus.page';

describe('MyfocusPage', () => {
  let component: MyfocusPage;
  let fixture: ComponentFixture<MyfocusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfocusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfocusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
