import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MyPerfectScrollBarModule } from './my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { CircleImageModule } from './dashboard/circle-image/circle-image.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { WatchStoriesComponent } from './dashboard/stories/watch/watch-stories.component';
import { ThemeService } from './theme.service';


@NgModule({
  declarations: [
    AppComponent
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    OverlayModule,
    MyPerfectScrollBarModule,
    ScrollingModule,
    HttpClientModule,
    DashboardModule,
    AuthModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('jwt');},
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/auth']
      }
    })
  ],
  entryComponents: [
    WatchStoriesComponent
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
