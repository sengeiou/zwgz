import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcopyPage } from './forcopy.page';

describe('ForcopyPage', () => {
  let component: ForcopyPage;
  let fixture: ComponentFixture<ForcopyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcopyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcopyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
