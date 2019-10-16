import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatPaginator, MatSnackBar, MatDialog, PageEvent, MatDialogRef } from '@angular/material';
import { Post } from 'src/app/model/post';
import { ImageService } from 'src/app/config/services/image/image.service';
import { environment } from 'src/environments/environment';
import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';
import { PostsService } from '../posts.service';
import { FollowersService } from 'src/app/dashboard/followers/followers.service';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  private url: String = environment.urlApi;

  private user: User;

  inputsComments: String[] = [];


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
    public dialog: MatDialog,
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
      () => {
        alert('error');
      });
  }
  public onB(e) {
    alert(e);
  }

  private findAll(): void {
    this.isLoadingResults = true;
    this.postsService.findAllPostsFollowers(this.user.id, ((this.dataConfig.pageIndex) * this.dataConfig.pageSize).toString(), this.dataConfig.pageSize).subscribe(
      response => {
        this.dataSource = response;
        this.changeDetectorRefs.detectChanges();
        this.isLoadingResults = false;
        //await new Promise(resolve => setTimeout(() => resolve(), 1000)).then(() => this.isLoadingResults = false);
      },
      () => {
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
  public delete(postId: number): void {
    this.postsService.delete(postId).subscribe(() => {
      this.count();

      this.snackBar.openFromComponent(CustomSnackBarComponent, {
        duration: 2000,
        data: { "lang": 'home.posts.cardPost.header.snackBarToDelete' }
      });
    });
  }

  public onEmoji(index: number) {
    const dialogRef = this.dialog.open(EmojisDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (this.inputsComments[index] == null || this.inputsComments[index] == undefined) {
        this.inputsComments[index] = '' + result.emoji.native;
      }
      else
        this.inputsComments[index] += '' + result.emoji.native;
      this.changeDetectorRefs.detectChanges()
    });
  }

  public addComment(index: number) {
    alert(this.inputsComments[index]);
  }

  public addPost(): void {
    const dialogRef = this.dialog.open(AddPostComponent, { width: '600px', data: this.user });
    dialogRef.afterClosed().subscribe(result => {
      if (result instanceof Post) {
        this.dataSource.splice(0, 0, result);
        this.changeDetectorRefs.detectChanges()
      }

    });
  }

  public addStorie():void{
    alert('Add Storie');
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class EmojisDialog {
  constructor(
    public dialogRef: MatDialogRef<EmojisDialog>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelected(emoji): void {
    this.dialogRef.close(emoji);
  }

}