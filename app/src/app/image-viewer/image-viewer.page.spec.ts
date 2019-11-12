import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewerPage } from './image-viewer.page';

describe('ImageViewerPage', () => {
  let component: ImageViewerPage;
  let fixture: ComponentFixture<ImageViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
