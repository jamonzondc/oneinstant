import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoryCircleImageComponent } from './story-circle-image/story-circle-image.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [StoryCircleImageComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StoryCircleImageComponent]
})
export class CircleImageModule { }
