import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionReplyPage } from './question-reply.page';

describe('QuestionReplyPage', () => {
  let component: QuestionReplyPage;
  let fixture: ComponentFixture<QuestionReplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionReplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionReplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
