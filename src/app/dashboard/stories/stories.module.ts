import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalViewComponent } from './horizontal-view/horizontal-view.component';
import { VerticalViewComponent } from './vertical-view/vertical-view.component';
import { AddComponent } from './add/add.component';
import { WatchStoriesComponent } from './watch/watch-stories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/config/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MyPerfectScrollBarModule } from 'src/app/config/modules/my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { CircleImageModule } from 'src/app/config/modules/circle-image/circle-image.module';



@NgModule({
  declarations: [HorizontalViewComponent, VerticalViewComponent, AddComponent, WatchStoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    OverlayModule,
    ScrollingModule,
    MyPerfectScrollBarModule,
    CircleImageModule,
  ],
  exports: [HorizontalViewComponent, VerticalViewComponent, AddComponent, WatchStoriesComponent],
})
export class StoriesModule { }
