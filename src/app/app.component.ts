import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './config/services/theme/theme.service';
import { InternationalizationService } from './config/services/i18n/internationalization.service';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isDarkTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private internationalization: InternationalizationService) {

    this.internationalization.setLanguaje('en');
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }


 
}
