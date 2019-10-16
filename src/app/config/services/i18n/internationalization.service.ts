import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  lang: string='en';
  private _languaje = new BehaviorSubject<string>(this.lang);
  languaje = this._languaje.asObservable();

  constructor( private translate: TranslateService,) {
  }

  setLanguaje(languaje: string): void {
    this.lang = languaje;
    this._languaje.next(languaje);
  }

}
