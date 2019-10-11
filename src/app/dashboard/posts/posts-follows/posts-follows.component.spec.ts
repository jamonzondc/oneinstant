import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFollowsComponent } from './posts-follows.component';

describe('PostsFollowsComponent', () => {
  let component: PostsFollowsComponent;
  let fixture: ComponentFixture<PostsFollowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsFollowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
