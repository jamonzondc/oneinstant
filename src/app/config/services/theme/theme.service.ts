import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }
  
  private _darkTheme = new Subject<boolean>();
  
  isDarkTheme = this._darkTheme.asObservable();

  isDarkThemeB:boolean;

  setDarkTheme(isDarkTheme: boolean): void {
    this.isDarkThemeB=isDarkTheme;
    this._darkTheme.next(isDarkTheme);
  }
}
