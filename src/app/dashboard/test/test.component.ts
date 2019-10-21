import { Component, OnInit, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { IDatasource, Datasource } from 'ngx-ui-scroll';
import { StorieService } from '../stories/storie.service';
import { Story } from 'src/app/model/story';
import { User } from 'src/app/model/user';
import { ISlimScrollOptions, SlimScrollEvent } from 'ngx-slimscroll';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
  items = []

  data: Story[];
  cache: number = 0;

  datasource = new Datasource({
    get: (index, count, success) => {

      this.data = [];
      console.log(index + '', count);

      console.log('offset: ' + ((index - 1) + this.cache) + ' limit: ', count);
      this.storieService.findAll((index - 1) + this.cache + '', count + '').subscribe(stories => {
        this.data.push(...stories);
        success(this.data);
      });

    },
    settings: {
      minIndex: 1
      

    }
  });

  constructor(private storieService: StorieService) {
    for (let index = 0; index < 100; index++) {
      this.items[index] = 'Item ' + index;

    }
  }


  reload() {
    this.datasource.adapter.reload(1);

  }
  doPrepend() {

    const u: User = new User();
    u.id = 1;
    const story: Story = new Story(-1, '', new Date().toUTCString(), '', u);
    this.storieService.save(story).subscribe(id => {
      story.id = id;
      this.cache++;
      this.datasource.adapter.prepend(story, true);
      setTimeout(() => {
        this.datasource.adapter.setScrollPosition(1 - this.cache);
      }, 1);

    });



  }

  doRemoveDatasource(id: number) {
    this.data = this.data.reduce((acc, item) => {
      if (item.id !== id) {
        if (item.id > id) {
          item.id--;
        }
        acc.push(item);
      }
      return acc;
    }, []);
    // this.MAX = this.data[this.data.length - 1].id;
  }

  doRemove(id: number) {
    this.storieService.delete(id).subscribe(response => {
      this.datasource.adapter.remove(item => item.data.id === id);
    })

    // this.doRemoveDatasource(id);
  }


  opts: ISlimScrollOptions;
  scrollEvents: EventEmitter<SlimScrollEvent>;
  ngOnInit() {

    this.scrollEvents = new EventEmitter<SlimScrollEvent>();
    this.opts = {
      position: "right", // left | right
      barBackground: "red", // #C9C9C9
      barOpacity: "0.8", // 0.8
      barWidth: "10", // 10
      barBorderRadius: "20", // 20
      barMargin: "0", // 0
      gridBackground: "#d9d9d9", // #D9D9D9
      gridOpacity: "1", // 1
      gridWidth: "2", // 2
      gridBorderRadius: "20", // 20
      gridMargin: "0", // 0
      alwaysVisible: true, // true
      visibleTimeout: 1000, // 1000
    }
  }



}
