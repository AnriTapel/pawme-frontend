import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit {

  remindEmail: string;
  remindError: boolean = false;

  constructor(public popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  resetPassword(){
    if (!this.popupService.validateEmailInput(this.remindEmail))
      return this.remindError = true;
  }

}
