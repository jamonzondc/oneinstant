import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { User } from 'src/app/model/user';
import { Subscription, Observable } from 'rxjs';
import { Pagination } from '../pagination';

@Component({
  selector: 'follower-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnDestroy {
 
  @Input() title: string;

  @Input() indexTab: number;

  @Input() count$: Observable<number>;

  @Input() dataSource$: Observable<User[]>;

  @Input() pagination: Pagination;

  @Output() load: EventEmitter<void> = new EventEmitter<void>();

  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  @Output() follow: EventEmitter<User> = new EventEmitter<User>();

  @Output() unFollow: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoadingResults: boolean = false;

  count: number;

  dataSource: User[] = [];

  displayedColumns: string[] = ['name'];
  
  private countSubscription: Subscription;

  private dataSourceSubscription: Subscription;



  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    
    this.subscribeCount();
    this.subscribeDataSource();
    // this.subscribePagination();
  }

  ngOnDestroy(): void {
    this.countSubscription.unsubscribe();
    this.dataSourceSubscription.unsubscribe();
  }

  public _load(): void {
    this.load.emit();
  }

  public _paginate(event: PageEvent): void {
    this.paginate.emit(event);
  }

  public _filter(text: string) {
    this.filter.emit(text);
  }

  public _follow(user: User): void {
    this.follow.emit(user);
  }

  public _unFollow(user: User): void {
    this.unFollow.emit(user);
  }

  private subscribeCount(): void {
    this.countSubscription = this.count$.subscribe(
      (countUsers: number) => {
        this.count = countUsers;
        this.subscribeDataSource();
      },
      () => {
        alert('subscribeDataSource: ' + this.title);
      });
  }

  private subscribeDataSource(): void {
    this.isLoadingResults = true;

    this.dataSourceSubscription = this.dataSource$.subscribe(
      (users: User[]) => {
        this.dataSource = users;
        this.isLoadingResults = false;
        this.changeDetectorRef.markForCheck();
      });
  }

}
