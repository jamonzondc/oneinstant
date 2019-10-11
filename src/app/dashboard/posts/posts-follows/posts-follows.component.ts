import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatPaginator, MatSnackBar, MatDialog, PageEvent, MatDialogRef } from '@angular/material';
import { PostsService } from '../posts.service';
import { Post } from 'src/app/model/post';
import { ImageService } from 'src/app/config/services/image/image.service';
import { async } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';
import { FollowersService } from '../../followers/followers.service';

import { Observable, fromEvent, interval } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { AddComponent } from '../add/add.component';


@Component({
  selector: 'app-posts-follows',
  templateUrl: './posts-follows.component.html',
  styleUrls: ['./posts-follows.component.scss']
})
export class PostsFollowsComponent implements OnInit {
  
  private url: String = environment.urlApi;

  private user: User;

  inputsComments:String[]=[];

  
  @ViewChild('paginator', { read: MatPaginator, static: false }) paginator: MatPaginator;
  isLoadingResults: boolean = false;
  dataSource: Post[] = [];
  dataConfig: any = {
    pageIndex: 0,
    pageSize: 2,// Cantidad de items a mostrar por página
    length: 0// Cantidad total de itmes
  };

  constructor(private postsService: PostsService,
    private snackBar: MatSnackBar, 
    private followersServices: FollowersService, 
    private imageService: ImageService, 
    public dialog: MatDialog,  
    private postService: PostsService,
    private changeDetectorRefs: ChangeDetectorRef) {
    this.user = new User();
    this.user.id = 1;
    this.user.username = 'jjj';
    this.count();
   
  }

  ngOnInit(): void {

  }


  private count(): void {

    this.postsService.countPostsFollowers(this.user.id).subscribe(
      response => {
        this.dataConfig.length = response;
        this.findAll();
      },
      error => {
        alert('error');
      });
  }

  private findAll(): void {
    this.isLoadingResults = true;
    this.postsService.findAllPostsFollowers(this.user.id, ((this.dataConfig.pageIndex) * this.dataConfig.pageSize).toString(), this.dataConfig.pageSize).subscribe(
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

  onPaginate(event: PageEvent): void {
    this.dataConfig.pageSize = event.pageSize;
    this.dataConfig.pageIndex = event.pageIndex;
    this.findAll();
  }

  public loadImage(name: string): string {
    return `${this.url}posts/images/${name}`;
  }

  public goToPublishing(id: number) {
    alert(id);
  }
  public unFollowing(follower: User): void {

    follower.visible = !follower.visible;
    this.followersServices.stopFollowing(this.user.id, follower.id).subscribe(
      response => {
        this.snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 2000,
          data: { "lang": 'app.dashboard.followers.table.buttonAction.unfollow', params: { value: follower.username } }
        });
        //open(`Ha dejado de segir a ${follower.username}`, '', );
      },
      error => {
        alert('error');
      });
  }

  public onEmoji(index:number){
    const dialogRef = this.dialog.open(EmojisDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.inputsComments[index]+=result.emoji.native;
      this.changeDetectorRefs.detectChanges()
    });
  }
  
  public addComment(index:number, postId:number){
    alert(this.inputsComments[index]);
  }
 
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class EmojisDialog {
  constructor(
    public dialogRef: MatDialogRef<EmojisDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelected(emoji): void {
    this.dialogRef.close(emoji);
  }

}