import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
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



@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent {
 

 
}


/*
  //Tab 2
  @ViewChild('paginatorTab2', {static:true }) paginatorTab2: MatPaginator;
  isLoadingResultsTab2: boolean = false;
  dataSourceTab2: User[] = [];
  dataConfigTab2: any = {
    search: '',
    pageSize: 10,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };
  //Tab 3
  @ViewChild('paginatorTab3', { read: MatPaginator, static:false }) paginatorTab3: MatPaginator;
  isLoadingResultsTab3: boolean = false;
  dataSourceTab3: User[] = [];
  dataConfigTab3: any = {
    search: '',
    pageSize: 10,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };


  constructor() {
  
  }
  ngOnInit() {
      
  }
  ngAfterViewInit(): void {
   
  }

  //Tab 1
 

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
    this.followersServices.find(this.user.id, this.dataConfigTab2.search, ((this.paginatorTab2.pageIndex) * this.dataConfigTab2.pageSize).toString(), this.dataConfigTab2.pageSize, 'followers').subscribe(
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
    this.followersServices.find(this.user.id, this.dataConfigTab3.search, ((this.paginatorTab3.pageIndex) * this.dataConfigTab3.pageSize).toString(), this.dataConfigTab3.pageSize, 'followeing').subscribe(
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
    this.findAllFollowing();
  }

  stopFollowing(follower: User): void {
    follower.visible = false;
    this.followersServices.stopFollowing(this.user.id, follower.id).subscribe(
      response => {
        this.snackBar.open(`Ha dejado de segir a ${follower.username}`, '', { duration: 2000 });
      },
      error => {
        alert('error');
      });
  }*/