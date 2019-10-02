import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { log } from 'util';
import { throwMatDuplicatedDrawerError } from '@angular/material';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  

  title = 'VirtualLibrary';
  isExpanded: boolean = true;

  navMenu = [
    { title: 'Inicio', icon: 'home', routerLink: 'home' },
    { title: 'Libros', icon: 'book', routerLink: 'listbooks' },
    {
      title: 'Red social', icon: 'thumb_up', childrens: [
        { title: 'Muro', icon: 'dashboard' },
        { title: 'Buscar amigos', icon: 'search', routerLink: 'searchFriends' },
        { title: 'Solicitudes de amistad', icon: 'group_ad', routerLink: 'solicitFriendship' },
        { title: 'Mis amigos', icon: 'group', routerLink: 'myFriends' },
      ]
    },
    { title: 'Acerca de', icon: 'info' }
  ];

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1280px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private widthSave:string;

  ngOnInit() {
    document.getElementById("sidenav").style.width='240px';
   
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private marginBackup: string = '';

  onFolded(): void {


    let sidenav = document.getElementById("sidenav");
    let sidenavContent = document.getElementById("sidenav-content");
    
    if (this.isExpanded) {
      this.isExpanded = false;
      this.marginBackup = sidenavContent.style.marginLeft;
      let cal: number = 268 - (240 - 89);
      let margin: string = cal + 'px';
      sidenav.style.width='89px';
      sidenavContent.style.marginLeft = margin;
    }
    else {
      this.isExpanded = true;
      sidenav.style.width='240px';
      sidenavContent.style.marginLeft = this.marginBackup;
    }
    sidenav.style.display='block';
    //Normal
    sidenav.style.transition = 'all .4s cubic-bezier(.25,.8,.25,1)';
    sidenavContent.style.transition = 'all .4s cubic-bezier(.25,.8,.25,1)';
    //webkit
    sidenav.style.webkitTransition = 'all .4s cubic-bezier(.25,.8,.25,1)';
    sidenavContent.style.webkitTransition = 'all .4s cubic-bezier(.25,.8,.25,1)';


  }
}
