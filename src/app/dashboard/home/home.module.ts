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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/home/', '.json');
}

@NgModule({
  declarations: [HomeComponent],
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
  exports:[HomeComponent]
})
export class HomeModule { 
  constructor(
    private translate: TranslateService, 
    private internationalization: InternationalizationService) {
    
    let firstTime: boolean = false;
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');

    this.internationalization.languaje.subscribe(
      lang => {
        firstTime = true;
        this.translate.use(lang);
      });

    if (!firstTime) {
      this.translate.use(this.internationalization.lang);
    }
  }
}
