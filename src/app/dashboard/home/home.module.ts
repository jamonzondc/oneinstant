import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/config/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MyPerfectScrollBarModule } from 'src/app/config/modules/my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { CircleImageModule } from 'src/app/config/modules/circle-image/circle-image.module';
import { InternationalizationService } from 'src/app/config/services/i18n/internationalization.service';
import { StoriesModule } from '../stories/stories.module';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { PostsListComponent, EmojisDialog } from './posts/posts-list/posts-list.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SpeedDialFabComponent } from './speed-dial-fab/speed-dial-fab.component';
import { UiScrollModule } from 'ngx-ui-scroll' ;
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ViewComponent } from './posts/view/view.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}

@NgModule({
  declarations: [HomeComponent, AddPostComponent, PostsListComponent, EmojisDialog, SpeedDialFabComponent, ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    OverlayModule,
    ScrollingModule,
    NgScrollbarModule,
    PickerModule,
    CircleImageModule,
    UiScrollModule,
    StoriesModule,
    
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]

      },
      isolate: true
    }),
    HomeRoutingModule
  ],
  entryComponents:[AddPostComponent, EmojisDialog],
  
})
export class HomeModule { 
  constructor(
    private translate: TranslateService, 
    private internationalization: InternationalizationService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.internationalization.languaje.subscribe(
      lang => {
        this.translate.use(lang);
      });
  }
}
