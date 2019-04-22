import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Topic2Page } from './topic2.page';

describe('Topic2Page', () => {
  let component: Topic2Page;
  let fixture: ComponentFixture<Topic2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Topic2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Topic2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
