import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-story-circle-image',
  templateUrl: './story-circle-image.component.html',
  styleUrls: ['./story-circle-image.component.scss']
})
export class StoryCircleImageComponent implements OnInit {

  @Input()
  image: string = 'avatar:svg-1';

  @Input()
  borderColor:string='#69f0ae';

  constructor() { 
   
  }

  ngOnInit() {
    
    
  }

  isAvatar(): boolean {
    return (this.image[0] == 'a') ? true : false;
  }

  getBoxShadow():string{
    return `0 0 0 2px ${this.borderColor}, 0 0 2px white`;
  }

}
