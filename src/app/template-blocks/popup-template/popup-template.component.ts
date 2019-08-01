import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PopupTemplateService } from './popup-template.service';

@Component({
  selector: 'app-popup-template',
  templateUrl: './popup-template.component.html',
  styleUrls: ['./popup-template.component.scss']
})
export class PopupTemplateComponent implements AfterViewInit {

  constructor(private popupService: PopupTemplateService) { }

  ngAfterViewInit() {
  }

  closePopup(){
    this.popupService.setShowStatus(false);
  }

}
