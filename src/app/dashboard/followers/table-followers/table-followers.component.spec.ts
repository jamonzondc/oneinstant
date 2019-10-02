import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFollowersComponent } from './table-followers.component';

describe('TableFollowersComponent', () => {
  let component: TableFollowersComponent;
  let fixture: ComponentFixture<TableFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
