import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
  selector: 'speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.scss'],
  animations: speedDialFabAnimations,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SpeedDialFabComponent implements OnInit {

  @Output() addPost = new EventEmitter();

  @Output() addStorie = new EventEmitter();

  fabButtons = [
    {
      icon: 'access_time',
      action: '_addStorie()'
    },
    {
      icon: 'note',
      action: '_addPost()'
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

  public action(index: number): void {
    if (index == 1) {
      this.addPost.emit();
    }
    else {
      this.addStorie.emit();
    }
  }

}
