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
import { async } from 'q';


@Component({
  selector: 'app-vertical-view',
  templateUrl: './vertical-view.component.html',
  styleUrls: ['./vertical-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalViewComponent implements OnInit {

  private user: User;
  dataSource: MyDataSource = null;

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

        this.dataSource = new MyDataSource(this.storiesService, response);
        this.changeDetectorRefs.markForCheck();

      },
      error => { log('error'); });
  }

  getUserName(item: Story): string {
    let user: User = item.user;
    return user.username;
  }



  openMatDialog(): void {
    //  let dialogRef = this.matDialog.open(WatchStoriesComponent);
    let u: User = new User();
    u.id = 1;
    u.username = 'Insert';
    u.image = 'avatar:svg-14';
    let s = new Story(1000, 'a', new Date().toUTCString(), '', u);
    this.storiesService.save(s).subscribe(r => {
      s.id=r;
     
      this.dataSource.addStory(s);
    });

    
    //this.changeDetectorRefs.markForCheck();
  }


}
export class MyDataSource extends DataSource<Story | undefined> {

  private _pageSize: number = 5;
  private _cachedData: Story[];
  private _fetchedPages: Set<number> = new Set<number>();
  private _dataStream: BehaviorSubject<(Story | undefined)[]>;
  private _subscription: Subscription = new Subscription();
  private lastPage: number = 0;
  private realCountInCache: number = 0;

  constructor(
    public storiesService: StorieService,
    public _length
  ) {
    super();

  }

  isAdd: boolean = false;

  connect(collectionViewer: CollectionViewer): Observable<(Story | undefined)[]> {
    this._cachedData = Array.from<Story>({ length: this._length });
    this._dataStream = new BehaviorSubject<(Story | undefined)[]>(this._cachedData);
    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
      if (!this.isAdd) {
        console.log('Entro al view change');
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      }
      this.isAdd = false;
    }));

    return this._dataStream;
  }
  countt: number = 0;
  public addStory(story: Story): void {

    this.countt++;
    this.isAdd = true;
    if (this.countt == this._pageSize) {
      this.lastPage++;
      this._fetchedPages.add(this.lastPage);
      this.countt = 0;
    }
    this._cachedData.splice(0, 0, story);
    this._dataStream.next(this._cachedData);


  }

  disconnect(): void {

    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {

    if (this._fetchedPages.has(page)) {
      return;
    }
    if (this.countt == 0) {
      this._fetchedPages.add(page);
      this.lastPage = page;
    }

    this.storiesService.findAll(page * this._pageSize + '', this._pageSize + '').subscribe(response => {
      this.realCountInCache += 5;
      this._cachedData.splice((page * this._pageSize) + this.countt, this._pageSize, ...response);
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

