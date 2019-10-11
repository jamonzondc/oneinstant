import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeedDialFabComponent } from './speed-dial-fab/speed-dial-fab.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [SpeedDialFabComponent],
  imports: [
    CommonModule,
   MaterialModule
  ],
  exports:[SpeedDialFabComponent]

})
export class ShareModule { }
