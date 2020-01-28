import { Component, OnInit } from '@angular/core';
import { RegisterCustomer } from 'src/app/model/registerCustomer';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.scss']
})
export class ClientChatComponent implements OnInit {

  invalidFields: any[] = [];
  clientData: RegisterCustomer = {
    email: null,
    name: null,
    password: null,
    phone: null,
    preferWhatsapp: null
  };

  newClientAcception: boolean = true;

  constructor(public appService: AppService) { }

  ngOnInit() {
  }
  validateFields(): boolean {
    this.invalidFields = [];
    let isValid = true;
    if (!this.clientData.name || this.clientData.name == "" || this.clientData.name.length < 2 || this.clientData.name.length > 30) {
      isValid = false;
      this.invalidFields.push("name");
    }
    if (!this.clientData.phone || this.clientData.phone == ""
      || this.clientData.phone.length != 17) {
      if (this.clientData.phone.length == 18 )
        this.clientData.phone = this.clientData.phone.substr(0, 17);
      else {
        isValid = false;
        this.invalidFields.push("phone");
      }
    }

    if (!this.clientData.email || this.clientData.email == ""
      || !this.appService.validateEmailInput(this.clientData.email)) {
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.clientData.password || this.clientData.password == ""
      || this.clientData.password.length < 2 || this.clientData.password.length > 30) {
      isValid = false;
      this.invalidFields.push("password");
    }

    if (!this.newClientAcception) {
      isValid = false;
      this.invalidFields.push("acception");
    }

    return isValid;
  }

}
