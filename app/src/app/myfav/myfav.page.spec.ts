import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavPage } from './myfav.page';

describe('MyfavPage', () => {
  let component: MyfavPage;
  let fixture: ComponentFixture<MyfavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
