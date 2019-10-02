import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchStoriesComponent } from './watch-stories.component';

describe('WatchStoriesComponent', () => {
  let component: WatchStoriesComponent;
  let fixture: ComponentFixture<WatchStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
