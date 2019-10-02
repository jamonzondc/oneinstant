import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { SiginComponent } from './sigin/sigin.component';
import { SigupComponent } from './sigup/sigup.component';
import { MyPerfectScrollBarModule } from '../my-perfect-scroll-bar/my-perfect-scroll-bar.module';




@NgModule({
  declarations: [
    SiginComponent,
    SigupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MyPerfectScrollBarModule,
    OverlayModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
