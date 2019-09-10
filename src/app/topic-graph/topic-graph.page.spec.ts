import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicGraphPage } from './topic-graph.page';

describe('TopicGraphPage', () => {
  let component: TopicGraphPage;
  let fixture: ComponentFixture<TopicGraphPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicGraphPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicGraphPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
