import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyquestionPage } from './myquestion.page';

describe('MyquestionPage', () => {
  let component: MyquestionPage;
  let fixture: ComponentFixture<MyquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyquestionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
