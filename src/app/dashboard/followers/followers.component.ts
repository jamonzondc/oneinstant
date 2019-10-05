import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Type } from '@angular/compiler';
import { async } from 'rxjs/internal/scheduler/async';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { SiginService } from 'src/app/auth/sigin/sigin.service';
import { User } from 'src/app/model/user';
import { FollowersService } from './followers.service';
import { Follower } from 'src/app/model/follower';
import { log } from 'util';
import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';



@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  providers:[]
})
export class FollowersComponent {


  private user: User;
  displayedColumns: string[] = ['name'];

  //Tab 1 
  @ViewChild('paginatorTab1', { read: MatPaginator, static: false }) paginatorTab1: MatPaginator;
  isLoadingResultsTab1: boolean = false;
  dataSourceTab1: User[] = [];
  dataConfigTab1: any = {
    search: '',
    pageIndex: 0,
    pageSize: 5,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };
  //Tab 2
  @ViewChild('paginatorTab2', { read: MatPaginator, static: false }) paginatorTab2: MatPaginator;
  isLoadingResultsTab2: boolean = false;
  dataSourceTab2: User[] = [];
  dataConfigTab2: any = {
    search: '',
    pageIndex: 0,
    pageSize: 5,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };
  //Tab 3
  @ViewChild('paginatorTab3', { read: MatPaginator, static: false }) paginatorTab3: MatPaginator;
  isLoadingResultsTab3: boolean = false;
  dataSourceTab3: User[] = [];
  dataConfigTab3: any = {
    search: '',
    pageIndex: 0,
    pageSize: 5,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };


  constructor(private followersServices: FollowersService, private snackBar: MatSnackBar, private siginService: SiginService) {
    this.user = new User();
    this.user.id = 1;
  }

  ngOnInit(): void {
    this.countNotFollowers();
    this.countFollowers();
    this.countFollowing();

  }

  ngAfterViewInit(): void {

  }


  onTabChange(matTabEventeChange: MatTabChangeEvent) {
    
/*
    if (matTabEventeChange.index == 0) {
      this.paginatorTab1.pageIndex = this.dataConfigTab1.pageIndex;
    }
    else if (matTabEventeChange.index == 1) {
      this.paginatorTab2.pageIndex = this.dataConfigTab2.pageIndex;
    }
    else {
      this.paginatorTab3.pageIndex = this.dataConfigTab3.pageIndex;
    }*/
  }

  //Tab 1
  private countNotFollowers(): void {

    this.followersServices.count(this.user.id, this.dataConfigTab1.search, 'notfollowers').subscribe(
      response => {
        this.dataConfigTab1.length = response;
        this.findAllNotFollowers();
      },
      error => {
        alert('error');
      });
  }

  private findAllNotFollowers(): void {
    this.isLoadingResultsTab1 = true;
    this.followersServices.find(this.user.id, this.dataConfigTab1.search, ((this.dataConfigTab1.pageIndex) * this.dataConfigTab1.pageSize).toString(), this.dataConfigTab1.pageSize, 'notfollowers').subscribe(
      response => {
        this.dataSourceTab1 = response;
        this.isLoadingResultsTab1 = false;
        //await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => this.isLoadingResults = false);
      },
      error => {
        this.isLoadingResultsTab1 = false;
        alert('error');
      });
  }

  loadTab1(): void {
    this.countNotFollowers();
  }

  public following(user: User): void {
    user.visible = !user.visible;
    let follower: Follower = new Follower(this.user.id, user.id);
    this.followersServices.following(follower).subscribe(
      response => {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 2000, 
          data:{"lang":'app.dashboard.followers.table.buttonAction.follow', params:{value:user.username}}
        });
        //this.snackBar.open(`Ha empezado a segir a ${user.username}`, '', { duration: 2000 });
      },
      error => {
        alert('error');
      });
  }

  onPaginateTab1(event: PageEvent): void {
    this.dataConfigTab1.pageSize = event.pageSize;
    this.dataConfigTab1.pageIndex = event.pageIndex;
    this.findAllNotFollowers();
  }

  onFilterTab1() {
    this.countNotFollowers();
  }

  applyFilterTab1(filterValue: string) {
    this.dataConfigTab1.search = filterValue;
    this.countNotFollowers();
  }

  //Tab2
  private countFollowers(): void {
    this.followersServices.count(this.user.id, this.dataConfigTab2.search, 'followers').subscribe(
      response => {
        this.dataConfigTab2.length = response;
        this.findAllFollowers();
      },
      error => {
        alert('error');
      });
  }

  private findAllFollowers(): void {
    this.isLoadingResultsTab2 = true;
    log('entro');
    this.followersServices.find(this.user.id, this.dataConfigTab2.search, ((this.dataConfigTab2.pageIndex) * this.dataConfigTab2.pageSize).toString(), this.dataConfigTab2.pageSize, 'followers').subscribe(
      response => {
        log('entro2');
        this.dataSourceTab2 = response;

        this.isLoadingResultsTab2 = false;
        //await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => this.isLoadingResults = false);
      },
      error => {
        this.isLoadingResultsTab2 = false;
        alert('error');
      });
  }

  loadTab2(): void {
    this.countFollowers();
  }

  onPaginateTab2(event: PageEvent): void {
    this.dataConfigTab2.pageSize = event.pageSize;
    this.dataConfigTab2.pageIndex = event.pageIndex;
    this.findAllFollowers();
  }

  //Tab3
  private countFollowing(): void {

    this.followersServices.count(this.user.id, this.dataConfigTab3.search, 'following').subscribe(
      response => {
        this.dataConfigTab3.length = response;
        this.findAllFollowing();
      },
      error => {
        alert('error');
      });
  }

  private findAllFollowing(): void {
    this.isLoadingResultsTab3 = true;
    this.followersServices.find(this.user.id, this.dataConfigTab3.search, ((this.dataConfigTab3.pageIndex) * this.dataConfigTab3.pageSize).toString(), this.dataConfigTab3.pageSize, 'following').subscribe(
      response => {
        this.dataSourceTab3 = response;

        this.isLoadingResultsTab3 = false;
        //await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => this.isLoadingResults = false);
      },
      error => {
        this.isLoadingResultsTab3 = false;
        alert('error');
      });
  }

  loadTab3(): void {
    this.countFollowing();
  }

  onPaginateTab3(event: PageEvent): void {
    this.dataConfigTab3.pageSize = event.pageSize;
    this.dataConfigTab3.pageIndex = event.pageIndex;
    this.findAllFollowing();
  }

  unFollowing(follower: User): void {
    follower.visible = !follower.visible;
    this.followersServices.stopFollowing(this.user.id, follower.id).subscribe(
      response => {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 2000,
          data:{"lang":'app.dashboard.followers.table.buttonAction.unfollow', params:{value:follower.username}}
           });
        //open(`Ha dejado de segir a ${follower.username}`, '', );
      },
      error => {
        alert('error');
      });
  }

}


/*
 */