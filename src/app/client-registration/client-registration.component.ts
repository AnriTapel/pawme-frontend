import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../services/popup-service/popup-template.service';



@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  constructor(private popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  showBreederMessagePopup(): void {
    this.popupService.setCurrentForm('client-chat');
    this.popupService.setShowStatus(true);
  }

}
