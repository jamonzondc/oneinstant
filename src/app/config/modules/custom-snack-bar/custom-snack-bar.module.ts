import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSnackBarComponent } from './custom-snack-bar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InternationalizationService } from '../../services/i18n/internationalization.service';


@NgModule({
  declarations: [CustomSnackBarComponent],
  imports: [
    CommonModule,
     TranslateModule
  ],
  entryComponents:[CustomSnackBarComponent],
  exports:[CustomSnackBarComponent, TranslateModule]
})
export class CustomSnackBarModule {
 
 }
