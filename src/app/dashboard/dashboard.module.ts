import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StoriesComponent } from './stories/stories.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPerfectScrollBarModule } from '../my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { CircleImageModule } from './circle-image/circle-image.module';
import { StoryCircleImageComponent } from './circle-image/story-circle-image/story-circle-image.component';
import { WatchStoriesComponent } from './stories/watch/watch-stories.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowersModule } from './followers/followers.module';



@NgModule({
  declarations: [
    HomeComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    StoriesComponent,
    
    WatchStoriesComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MyPerfectScrollBarModule,
    MaterialModule,
    FlexLayoutModule,
    OverlayModule,
    ScrollingModule,
    FollowersModule
    
    
  ],
  providers: [
  
  ]
})
export class DashboardModule { }
