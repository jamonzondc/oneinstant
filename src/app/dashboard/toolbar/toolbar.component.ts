import { Component, OnInit, Output, EventEmitter, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { SiginService } from 'src/app/auth/sigin/sigin.service';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output()
  trigger = new EventEmitter<void>();
  isDarkTheme: Observable<boolean>;
  private overlay:HTMLElement;

  constructor(private router: Router,
    private siginService: SiginService,
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer,
    private renderer: Renderer2) {
    this.overlay=overlayContainer.getContainerElement();
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
    if (checked) {
      this.renderer.addClass(this.overlay, 'dark-theme');
    } else {
      this.renderer.removeClass(this.overlay, 'dark-theme');
    }
  }

  logout() {
    this.siginService.logout();
    this.router.navigate(['/sigin']);
  }

  public fTrigger(): void {
    this.trigger.emit();
  }

}
