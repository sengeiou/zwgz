import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopiclistPage } from './topiclist.page';

describe('TopiclistPage', () => {
  let component: TopiclistPage;
  let fixture: ComponentFixture<TopiclistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopiclistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopiclistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
