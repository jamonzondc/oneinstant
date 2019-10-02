import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCircleImageComponent } from './user-circle-image.component';

describe('UserCircleImageComponent', () => {
  let component: UserCircleImageComponent;
  let fixture: ComponentFixture<UserCircleImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCircleImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCircleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
