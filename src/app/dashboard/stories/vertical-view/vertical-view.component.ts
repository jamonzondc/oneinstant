import { Component, HostBinding, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { log } from 'util';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Story } from 'src/app/model/story';
import { MatSnackBar } from '@angular/material';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';
import { StorieService } from '../storie.service';
import { FollowersService } from '../../followers/followers.service';
import { WatchStoriesComponent } from '../watch/watch-stories.component';


@Component({
  selector: 'app-vertical-view',
  templateUrl: './vertical-view.component.html',
  styleUrls: ['./vertical-view.component.scss']
})
export class VerticalViewComponent implements OnInit {

  private user: User;
  dataSource: any = null;
 
  constructor(
    public storiesService: StorieService,
    private changeDetectorRefs: ChangeDetectorRef,
    public matDialog: MatDialog,
    public followersServices: FollowersService,
    public snackBar: MatSnackBar
  ) {
    this.user = new User();
    this.user.id = 1;

  }


  ngOnInit(): void {
    this.storiesService.count().subscribe(
      response => {
        log('response: ' + response);
        this.dataSource = new MyDataSource(this.storiesService, response);
        this.changeDetectorRefs.detectChanges();
      },
      error => { log('error'); });
  }

  getUserName(item: Story): string {
    let user: User = item.user;
    return user.username;
  }



  openMatDialog(): void {
    let dialogRef = this.matDialog.open(WatchStoriesComponent);
  }

 
}
export class MyDataSource extends DataSource<Story | undefined> {

  private _pageSize = 5;
  private _cachedData;
  private _fetchedPages = new Set<number>();
  private _dataStream;
  private _subscription = new Subscription();


  constructor(
    public storiesService: StorieService,
    public _length
  ) {
    super();

  }

  connect(collectionViewer: CollectionViewer): Observable<(Story | undefined)[]> {
    log('Connect');

    this._cachedData = Array.from<Story>({ length: this._length });
    this._dataStream = new BehaviorSubject<(Story | undefined)[]>(this._cachedData);


    this._subscription.add(collectionViewer.viewChange.subscribe(range => {


      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      log('start: ' + startPage + '--- end: ' + endPage);

      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));

    return this._dataStream;
  }

  disconnect(): void {
    log('disconnect');
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {

    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);


    this.storiesService.findAll(page * this._pageSize + '', this._pageSize + '').subscribe(response => {
      this._cachedData.splice(page * this._pageSize, this._pageSize, ...response);
      this._dataStream.next(this._cachedData);
    },
      error => {

      });

    /*
        setTimeout(() => {
    
          let a: string[] = Array.from({ length: this._pageSize }).map((_, i) => `Item #${page * this._pageSize + i}`);
          this._cachedData.splice(page * this._pageSize, this._pageSize, ...a);
          this._dataStream.next(this._cachedData);
        }, Math.random() * 1000 + 200);
    */
  }
}

