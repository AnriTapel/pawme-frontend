import { Component, OnInit, Input } from '@angular/core';
import { MessageToBreeder } from 'src/app/model/messageToBreeder';
import { AppService } from 'src/app/services/app-service/app.service';
import { BreederControllerService } from 'src/app/api/api';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';

@Component({
  selector: 'app-breeder-message',
  templateUrl: './breeder-message.component.html',
  styleUrls: ['./breeder-message.component.scss']
})
export class BreederMessageComponent implements OnInit {

  invalidFields: Array<string> = [];
  acception: boolean = false;

  breederMessage: MessageToBreeder = {
    name: null,
    phone: null,
    email: null,
    message: null,
    breeder: null
  }

  constructor(private appService: AppService, private breederService: BreederControllerService,
    public popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  sendMessage(): void{
    if (!this.validateFields())
      return;
  }

  validateFields(): boolean{
    this.invalidFields = [];
    let isValid = true;
    if (!this.breederMessage.name || this.breederMessage.name == ""){
      isValid = false;
      this.invalidFields.push("name");
    }

    if (!this.breederMessage.email || this.breederMessage.email == ""
        || !this.appService.validateEmailInput(this.breederMessage.email)){
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.breederMessage.phone || this.breederMessage.phone == ""
        || !this.appService.validatePhoneInput(this.breederMessage.phone)){
      isValid = false;
      this.invalidFields.push("phone");
    }

    if (!this.breederMessage.message || this.breederMessage.message == ""){
      isValid = false;
      this.invalidFields.push("message");
    }

    if (!this.acception){
      isValid = false;
      this.invalidFields.push("acception");
    }

    return isValid;
  }

}
