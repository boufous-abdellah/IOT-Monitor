import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTopicPage } from './new-topic.page';

describe('NewPage', () => {
  let component: NewTopicPage;
  let fixture: ComponentFixture<NewTopicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTopicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTopicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
