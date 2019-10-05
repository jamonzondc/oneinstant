import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../config/modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPerfectScrollBarModule } from '../config/modules/my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { CircleImageModule } from '../config/modules/circle-image/circle-image.module';
import { MatPaginatorIntl } from '@angular/material';
import { getDutchPaginatorIntl } from '../config/functions/dutch-paginator-intl';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { FooterComponent } from './footer/footer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { StoriesComponent } from './stories/stories.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { InternationalizationService } from '../config/services/i18n/internationalization.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/dashboard/', '.json');
}


@NgModule({
  declarations: [
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    StoriesComponent

  ],
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

    DashboardRoutingModule


  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class DashboardModule {

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
