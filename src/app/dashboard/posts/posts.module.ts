import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsFollowsComponent, EmojisDialog } from './posts-follows/posts-follows.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/config/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MyPerfectScrollBarModule } from 'src/app/config/modules/my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { CircleImageModule } from 'src/app/config/modules/circle-image/circle-image.module';
import { AddComponent } from './add/add.component';
import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from 'src/app/config/modules/share/share.module';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CustomSnackBarModule } from 'src/app/config/modules/custom-snack-bar/custom-snack-bar.module';



@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    OverlayModule,
    TranslateModule,
    ShareModule,
    ScrollingModule,
    MyPerfectScrollBarModule,
    CircleImageModule,
    CustomSnackBarModule,
    PickerModule 

    

  ],
  declarations: [PostsFollowsComponent, MyPostsComponent, AddComponent, EmojisDialog],
  entryComponents:[AddComponent, EmojisDialog],
  exports:[PostsFollowsComponent, MyPostsComponent,AddComponent,  TranslateModule ]
})
export class PostsModule { }
