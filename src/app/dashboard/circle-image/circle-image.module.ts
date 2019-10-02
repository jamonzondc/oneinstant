import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryCircleImageComponent } from './story-circle-image/story-circle-image.component';
import { UserCircleImageComponent } from './user-circle-image/user-circle-image.component';




@NgModule({
  declarations: [StoryCircleImageComponent, UserCircleImageComponent],
  imports: [
    CommonModule
  ],
  exports: [StoryCircleImageComponent, UserCircleImageComponent]
})
export class CircleImageModule { }
