import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSubmitPage } from './question-submit.page';

describe('QuestionSubmitPage', () => {
  let component: QuestionSubmitPage;
  let fixture: ComponentFixture<QuestionSubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSubmitPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
