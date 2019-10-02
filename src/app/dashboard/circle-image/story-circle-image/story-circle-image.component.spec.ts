import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCircleImageComponent } from './story-circle-image.component';

describe('StoryCircleImageComponent', () => {
  let component: StoryCircleImageComponent;
  let fixture: ComponentFixture<StoryCircleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryCircleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCircleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
