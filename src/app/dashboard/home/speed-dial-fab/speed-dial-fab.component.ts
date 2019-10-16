import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent implements OnInit {

  @Output() addPost = new EventEmitter();

  @Output() addStorie = new EventEmitter();

  fabButtons = [
    {
      icon: 'timeline'
    },
    {
      icon: 'view_headline'
    },
    {
      icon: 'room'
    },
    {
      icon: 'lightbulb_outline'
    },
    {
      icon: 'lock'
    }
  ];

  buttons = [];

  fabTogglerState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  public _addPost(): void {
    this.addPost.emit();
  }
  public _addStorie(): void {
    this.addStorie.emit();
  }
}
