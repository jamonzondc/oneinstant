import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFollowersComponent } from './table-followers/table-followers.component';
import { FollowersComponent } from './followers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StoryCircleImageComponent } from '../circle-image/story-circle-image/story-circle-image.component';



@NgModule({
  declarations: [TableFollowersComponent, FollowersComponent, StoryCircleImageComponent],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    OverlayModule,
    ScrollingModule,

  ],
  exports:[StoryCircleImageComponent]
})
export class FollowersModule { }
