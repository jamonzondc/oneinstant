/*import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/model/post';
import { PostsService } from '../posts.service';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';
import { Datasource } from 'ngx-ui-scroll';
import { Comment } from 'src/app/model/comment';
import { CommentsService } from '../comments.service';
import { CustomSnackBarComponent } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material';
import { FollowersService } from 'src/app/dashboard/followers/followers.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnInit, OnDestroy {

  user: User;
  post: Post;
  isLoadingResults: boolean = false;
  comments: Comment[];
  countComment: number=-1;
  countItemsAdd: number=0;
  datasource = new Datasource({
    get: (index, count, success) => {

      this.comments = [];
      if (this.countComment != -1) {
        
        this.findAllCommentSubscription = this.commentService.findAll(this.post.id, (index - 1) + this.countItemsAdd, count).subscribe(newComments => {
          this.comments.push(...newComments);
          success(this.comments);
        });
      }
      else{
        success(this.comments);
      }

    },
    settings: {
      minIndex: 1
    }
  });

  private activatedRouteSubscription: Subscription;

  private postServiceSubscription: Subscription;

  private countCommentSubscription: Subscription;

  private findAllCommentSubscription: Subscription;


  private url: String = environment.urlApi;

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostsService,
    private commentService: CommentsService,
    private snackBar: MatSnackBar,
    private followersServices: FollowersService,
    private cd: ChangeDetectorRef) {
    this.user = new User();
    this.user.id = 1;
    this.user.username = 'jjj';

  }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.paramMap.subscribe(
      param => {
        if (param.has('id')) {
          this.postServiceSubscription = this.postService.findById(param.get('id')).subscribe(
            (post: Post) => {
              this.post = post;
              this.countCommentSubscription = this.commentService.count(this.post.id).subscribe(
                (count: number) => {
                  this.countComment = count;
                  this.datasource.adapter.reload(this.countComment);
                });

            });
        }
      });


  }



*/