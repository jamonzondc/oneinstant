import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from 'src/app/config/services/theme/theme.service';


@Component({
  selector: 'app-story-circle-image',
  templateUrl: './story-circle-image.component.html',
  styleUrls: ['./story-circle-image.component.scss']
})
export class StoryCircleImageComponent implements OnInit {

  @Input()
  image: string = 'avatar:svg-1';

  @Input()
  borderColor: string = '#69f0ae';

  @Input()
  background: string='white';

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    if (this.background == 'white') {
      let isSubscribe=false;
      this.themeService.isDarkTheme.subscribe(
        isDarkTheme => {
          isSubscribe=true;
          this.background = (isDarkTheme) ? '#424242' : 'white';
        }
      );
      if(!isSubscribe){
        this.background = (this.themeService.isDarkThemeB) ? '#424242' : 'white';
      }
    }

  }

  isAvatar(): boolean {
    return (this.image[0] == 'a') ? true : false;
  }

  getBoxShadow(): string {
    return `0 0 0 2px ${this.borderColor}, 0 0 2px white`;
  }
  getBackground(): string {
    return `2px solid ${this.background}`;
  }



}