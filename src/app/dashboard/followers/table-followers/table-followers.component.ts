import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, Input } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Type } from '@angular/compiler';
import { async } from 'rxjs/internal/scheduler/async';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { SiginService } from 'src/app/auth/sigin/sigin.service';
import { User } from 'src/app/model/user';

import { Follower } from 'src/app/model/follower';
import { log } from 'util';
import { FollowersService } from '../followers.service';


@Component({
  selector: 'app-table-followers',
  templateUrl: './table-followers.component.html',
  styleUrls: ['./table-followers.component.scss']
})
export class TableFollowersComponent implements OnInit, AfterViewInit {
  

  private user: User;

  displayedColumns: string[] = ['name'];

  private url: string;

  title:string;

  buttonName:string;

  buttonIcon:string;

  @Input()
  tabNumber: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  isLoadingResults: boolean = false;

  dataSource: User[] = [];

  dataConfig: any = {
    search: '',
    pageSize: 10,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };

  constructor(private followersServices: FollowersService, private snackBar: MatSnackBar, private siginService: SiginService) {
    this.user = new User();
    this.user.id = 1;

  
  }
 
  ngOnInit(): void {
    switch (this.tabNumber) {
      case 0: {
        this.url = 'notfollowers';
        this.title='Buscar';
        this.buttonName='Seguir';
        this.buttonIcon='person_add';
        break;
      }
      case 1: {
        this.url = 'followers';
        this.title='Seguidores';
        break;
      }
      case 2: {
        this.url = 'following';
        this.title='Seguidos';
        this.buttonName='Dejar';
        this.buttonIcon='close';
        break;
      }
    }
    this.count();
  }

  ngAfterViewInit(): void {
  
  }
  private count(): void {

    this.followersServices.count(this.user.id, this.dataConfig.search, this.url).subscribe(
      response => {
        this.dataConfig.length = response;
        this.find();
      },
      error => {
        alert('error');
      });
  }

  private find(): void {
    this.isLoadingResults = true;
    this.followersServices.find(this.user.id, this.dataConfig.search, ((this.paginator.pageIndex) * this.dataConfig.pageSize).toString(), this.dataConfig.pageSize, this.url).subscribe(
      response => {
        this.dataSource = response;
        this.isLoadingResults = false;
        //await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => this.isLoadingResults = false);
      },
      error => {
        this.isLoadingResults = false;
        alert('error');
      });
  }

  load(): void {
    this.count();
  }

  public onClick(user:User):void{
    switch (this.tabNumber) {
      case 0: {
       this.following(user);
        break;
      }
      case 1: {
        this.stopFollowing(user);
        break;
      }
    }
  }

  private following(user: User): void {
    user.visible = false;
    let follower: Follower = new Follower(this.user.id, user.id);
    this.followersServices.following(follower).subscribe(
      response => {
        this.snackBar.open(`Ha empezado a segir a ${user.username}`, '', { duration: 2000 });
      },
      error => {
        alert('error');
      });
  }

  private stopFollowing(follower: User): void {
    follower.visible = false;
    this.followersServices.stopFollowing(this.user.id, follower.id).subscribe(
      response => {
        this.snackBar.open(`Ha dejado de segir a ${follower.username}`, '', { duration: 2000 });
      },
      error => {
        alert('error');
      });
  }

  onPaginate(event: PageEvent): void {
    this.dataConfig.pageSize = event.pageSize;
    this.find();
  }

  onFilter() {
    this.count();
  }

  applyFilter(filterValue: string) {
    /* this.dataSource.filter = filterValue.trim().toLowerCase();
 
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }*/
  }
}
