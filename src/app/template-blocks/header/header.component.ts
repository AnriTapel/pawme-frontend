import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { PopupTemplateService } from '../popup-template/popup-template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService, private popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  showLoginPopup(){
    this.popupService.setCurrentForm('login');
    this.popupService.setShowStatus(true);
  }
}
