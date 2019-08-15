import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../popup-template/popup-template.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  showSignUpPopup(){
    this.popupService.setCurrentForm("sign-up");
    this.popupService.setShowStatus(true);
  }

}
