import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material';
import { SiginService } from 'src/app/auth/sigin/sigin.service';
import { User } from 'src/app/model/user';
import { FollowersService } from './followers.service';
import { Follower } from 'src/app/model/follower';
import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Pagination } from './pagination';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FollowersComponent implements OnInit, OnDestroy {
 

  countTab1$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  countTab2$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  countTab3$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  dataSourceTab1$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  dataSourceTab2$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  dataSourceTab3$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  private countSubscriptionTab1:Subscription;

  private countSubscriptionTab2:Subscription;

  private countSubscriptionTab3:Subscription;

  private dataSourceSubscriptionTab1:Subscription;

  private dataSourceSubscriptionTab2:Subscription;

  private dataSourceSubscriptionTab3:Subscription;

  private user: User;

  private paginationTab1: Pagination = new Pagination();;

  private paginationTab2: Pagination = new Pagination();;

  private paginationTab3: Pagination = new Pagination();;


  constructor(private followersServices: FollowersService, private snackBar: MatSnackBar) {
    this.user = new User();
    this.user.id = 1;
  }

  //Hooks
  ngOnInit(): void {
    this.loadTab1();
    this.loadTab2();
    this.loadTab3();
  }

  ngOnDestroy(): void {
    this.countSubscriptionTab1.unsubscribe();
    this.countSubscriptionTab2.unsubscribe();
    this.countSubscriptionTab3.unsubscribe();
    this.dataSourceSubscriptionTab1.unsubscribe();
    this.dataSourceSubscriptionTab2.unsubscribe();
    this.dataSourceSubscriptionTab3.unsubscribe();
  }
  public selectedIndexChange(index: number) {
    switch (index) {
      case 0: {
        this.paginationTab1 = new Pagination();
        this.loadTab1();
        break;
      }
      case 1: {
        this.paginationTab2 = new Pagination();
        this.loadTab2();
        break;
      }
      case 2: {
        this.paginationTab3 = new Pagination();
        this.loadTab3();
        break;
      }
    }
  }
  //Load
  public loadTab1(): void {
    this.countTab1();
    this.dataSourceTab1();
  }

  public loadTab2(): void {
    this.countTab2();
    this.dataSourceTab2();
  }

  public loadTab3(): void {
    this.countTab3();
    this.dataSourceTab3();
  }

  //Filter
  public filterTab1(name: string): void {
    this.paginationTab1.search = name;
    this.loadTab1();
  }

  public filterTab2(name: string): void {
    this.paginationTab2.search = name;
    this.loadTab2();
  }

  public filterTab3(name: string): void {
    this.paginationTab3.search = name;
    this.loadTab3();
  }

  //Pagination
  public paginateTab1(event: PageEvent): void {
    this.paginationTab1.pageSize = event.pageSize;
    this.paginationTab1.pageIndex = event.pageIndex;
    this.dataSourceTab1();
  }

  public paginateTab2(event: PageEvent): void {
    this.paginationTab2.pageSize = event.pageSize;
    this.paginationTab2.pageIndex = event.pageIndex;
    this.dataSourceTab2();
  }

  public paginateTab3(event: PageEvent): void {
    this.paginationTab3.pageSize = event.pageSize;
    this.paginationTab3.pageIndex = event.pageIndex;
    this.dataSourceTab3();
  }

  //Actions
  public follow(user: User): void {
    user.visible = !user.visible;
    let follower: Follower = new Follower(this.user.id, user.id);
    this.followersServices.following(follower).subscribe(
      () => {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 2000,
          data: { "lang": 'app.dashboard.followers.table.buttonAction.follow', params: { value: user.username } }
        });
        //this.snackBar.open(`Ha empezado a segir a ${user.username}`, '', { duration: 2000 });
      },
      () => {
        alert('error');
      });
  }

  public unFollow(follower: User): void {
    follower.visible = !follower.visible;
    this.followersServices.stopFollowing(this.user.id, follower.id).subscribe(
      () => {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 2000,
          data: { "lang": 'app.dashboard.followers.table.buttonAction.unfollow', params: { value: follower.username } }
        });
        //open(`Ha dejado de segir a ${follower.username}`, '', );
      },
      () => {
        alert('error');
      });
  }

  //Count
  private countTab1() {
    this.countSubscriptionTab1=this.followersServices.count(this.user.id, this.paginationTab1.search, 'notfollowers').subscribe(
      (count: number) => {
        this.countTab1$.next(count);
      });
  }
  private countTab2() {
    this.countSubscriptionTab2=this.followersServices.count(this.user.id, this.paginationTab1.search, 'followers').subscribe(
      (count: number) => {
        this.countTab2$.next(count);
      });
  }
  private countTab3() {
    this.countSubscriptionTab3=this.followersServices.count(this.user.id, this.paginationTab1.search, 'following').subscribe(
      (count: number) => {
        this.countTab3$.next(count);
      });
  }
  //DataSource
  private dataSourceTab1() {
    this.dataSourceSubscriptionTab1=this.followersServices.find(this.user.id, this.paginationTab1.search, ((this.paginationTab1.pageIndex) * this.paginationTab1.pageSize).toString(), this.paginationTab1.pageSize.toString(), 'notfollowers').subscribe(
      (users: User[]) => {
        this.dataSourceTab1$.next(users);
      });
  }
  private dataSourceTab2() {
    this.dataSourceSubscriptionTab2=this.followersServices.find(this.user.id, this.paginationTab2.search, ((this.paginationTab2.pageIndex) * this.paginationTab2.pageSize).toString(), this.paginationTab2.pageSize.toString(), 'followers').subscribe(
      (users: User[]) => {
        this.dataSourceTab2$.next(users);
      });
  }
  private dataSourceTab3() {
    this.dataSourceSubscriptionTab3=this.followersServices.find(this.user.id, this.paginationTab3.search, ((this.paginationTab3.pageIndex) * this.paginationTab3.pageSize).toString(), this.paginationTab3.pageSize.toString(), 'following').subscribe(
      (users: User[]) => {
        this.dataSourceTab3$.next(users);
      });
  }

}
