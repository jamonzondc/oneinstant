import { Component, OnInit } from '@angular/core';
import { InternationalizationService } from 'src/app/config/services/i18n/internationalization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private internationalization: InternationalizationService) { }

  ngOnInit() {
  }

  public onChangeLannguaje(langaje:string):void{
    this.internationalization.setLanguaje(langaje);
  }
}
