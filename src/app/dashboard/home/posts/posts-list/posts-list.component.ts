import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatPaginator, MatSnackBar, MatDialog, PageEvent, MatDialogRef } from '@angular/material';
import { Post } from 'src/app/model/post';
import { ImageService } from 'src/app/config/services/image/image.service';
import { environment } from 'src/environments/environment';
import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';
import { PostsService } from '../posts.service';
import { FollowersService } from 'src/app/dashboard/followers/followers.service';
import { AddPostComponent } from '../add-post/add-post.component';
import { Datasource } from 'ngx-ui-scroll';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsListComponent implements OnInit {

  private url: String = environment.urlApi;
  user: User;
  inputsComments: String[] = [];
  isLoadingResults: boolean = false;
  data: Post[];
  countItemsAdd: number = 0;

  datasource = new Datasource({
    get: (index, count, success) => {
      this.data = [];
      this.postsService.findAllPostsFollowers(this.user.id, (index - 1) + this.countItemsAdd + '', count + '').subscribe(posts => {
        this.data.push(...posts);
        success(this.data);
      });

    },
    settings: {
      minIndex: 1
     

    }
  });

  constructor(private postsService: PostsService,
    private snackBar: MatSnackBar,
    private followersServices: FollowersService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private router:Router) {
    this.user = new User();
    this.user.id = 1;
    this.user.username = 'jjj';

  }

  ngOnInit(): void {

  }

  public loadImage(name: string): string {
    return `${this.url}posts/images/${name}`;
  }

  public goToPublishing(id: number) {
    this.router.navigate(['/dashboard/home/posts', id]);
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
      this.datasource.adapter.remove(item => item.data.id === postId);     
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
    dialogRef.afterClosed().subscribe(post => {
      if (post instanceof Post) {
        this.postsService.save(post).subscribe(id => {
          post.id=id;
          this.countItemsAdd++;
          this.datasource.adapter.prepend(post, true);
          setTimeout(() => {
            this.datasource.adapter.setScrollPosition(10);
          }, 1);

        });
      }
    });
  }

  public addStorie(): void {
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