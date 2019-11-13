import { Component, OnInit, Input } from '@angular/core';
import { MessageToBreeder } from 'src/app/model/messageToBreeder';
import { AppService } from 'src/app/services/app-service/app.service';
import { BreederControllerService } from 'src/app/api/api';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { NotificationBarService } from '../../services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-breeder-message',
  templateUrl: './breeder-message.component.html',
  styleUrls: ['./breeder-message.component.scss']
})
export class BreederMessageComponent implements OnInit {

  invalidFields: Array<string> = [];
  acception: boolean = true;
  isError: boolean = false;

  breederMessage: MessageToBreeder = {
    name: null,
    phone: null,
    email: null,
    message: null,
    breeder: null
  }

  constructor(public appService: AppService, private breederService: BreederControllerService,
    public popupService: PopupTemplateService, private notificationService: NotificationBarService) { }

  ngOnInit() {
  }

  sendMessage(): void{
    if (!this.validateFields())
      return;

    this.breederMessage.email = this.breederMessage.email.toLowerCase();
    this.breederService.sendMessageToBreederUsingPOST(this.appService.userData.id, this.breederMessage).subscribe(
      () => {
        //@ts-ignore
        fbq('track', 'InitiateCheckout');
        //@ts-ignore
        ym(55779592, 'reachGoal', 'InitiateCheckout');
        this.popupService.setShowStatus(false);
        this.notificationService.setContext('Письмо заводчику успешно отправлено', true);
        this.notificationService.setVisibility(true);
      },
      () => this.isError = true
    )
  }

  validateFields(): boolean{
    this.invalidFields = [];
    let isValid = true;
    if (!this.breederMessage.name || this.breederMessage.name == "" || this.breederMessage.name.length > 64){
      isValid = false;
      this.invalidFields.push("name");
    }

    if (!this.breederMessage.email || this.breederMessage.email == ""
        || !this.appService.validateEmailInput(this.breederMessage.email)){
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.breederMessage.phone || this.breederMessage.phone == ""
        || this.breederMessage.phone.length != 17){
      isValid = false;
      this.invalidFields.push("phone");
    }

    if (!this.breederMessage.message || this.breederMessage.message == "" || this.breederMessage.message.length > 2048){
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
