import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from './config/modules/material/material.module';
import { MyPerfectScrollBarModule } from './config/modules/my-perfect-scroll-bar/my-perfect-scroll-bar.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { InternationalizationService } from './config/services/i18n/internationalization.service';
import { CustomSnackBarComponent } from './config/modules/custom-snack-bar/custom-snack-bar.component';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/app/', '.json');
}

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
    HttpClientModule,
    OverlayModule,
    MyPerfectScrollBarModule,
    ScrollingModule,
    HttpClientModule,

    AuthModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('jwt');
        },
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/auth']
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true

    }),
    AppRoutingModule
  ],
  entryComponents: [
    //WatchStoriesComponent
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

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
      this.translate.use('en');
    }
  }
}
