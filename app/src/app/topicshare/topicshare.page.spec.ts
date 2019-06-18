import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsharePage } from './topicshare.page';

describe('TopicsharePage', () => {
  let component: TopicsharePage;
  let fixture: ComponentFixture<TopicsharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
