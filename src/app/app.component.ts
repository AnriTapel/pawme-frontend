import { Component } from '@angular/core';
import { PopupTemplateService } from './template-blocks/popup-template/popup-template.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public popupService: PopupTemplateService) { }

}
