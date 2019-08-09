import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { PopupTemplateService } from '../popup-template/popup-template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public appService: AppService, public popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  showLoginPopup(){
    this.popupService.setCurrentForm('login');
    this.popupService.setShowStatus(true);
  }
}
