import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreplyPage } from './myreply.page';

describe('MyreplyPage', () => {
  let component: MyreplyPage;
  let fixture: ComponentFixture<MyreplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
