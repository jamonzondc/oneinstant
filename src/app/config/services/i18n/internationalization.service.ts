import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  lang: string;
  private _languaje = new Subject<string>();
  languaje = this._languaje.asObservable();

  constructor() {
  }

  setLanguaje(languaje: string): void {
    this.lang = languaje;
    this._languaje.next(languaje);
  }
}
