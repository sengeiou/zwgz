import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCenterPage } from './info-center.page';

describe('InfoCenterPage', () => {
  let component: InfoCenterPage;
  let fixture: ComponentFixture<InfoCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
