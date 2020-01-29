import { Component, OnInit } from '@angular/core';
import { RegisterCustomer } from 'src/app/model/registerCustomer';
import { AppService } from 'src/app/services/app-service/app.service';

 import { CustomerControllerService } from 'src/app/api/api';

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
  errorText: string = null;
  isLoading: boolean = false;

  constructor(public appService: AppService, public customerService: CustomerControllerService) { }

  ngOnInit() {
  }
  
  validateFields(): boolean {
    let isValid = true;
    if (!this.clientData.name || this.clientData.name == "" || this.clientData.name && this.clientData.name.length < 2 || this.clientData.name && this.clientData.name.length > 30) {
      isValid = false;
      this.invalidFields.push("name");
    }
    if (!this.clientData.phone || this.clientData.phone == ""
      || this.clientData.phone && this.clientData.phone.length != 17) {
      if (this.clientData.phone && this.clientData.phone.length == 18 )
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
      || this.clientData.password && this.clientData.password.length < 2 || this.clientData.password && this.clientData.password.length > 30) {
      isValid = false;
      this.invalidFields.push("password");
    }

    if (!this.newClientAcception) {
      isValid = false;
      this.invalidFields.push("acception");
    }

    return isValid;
  }

  fieldEdited(field: string): void {
    this.invalidFields = this.invalidFields.filter(it => it != field);
  }

  clientRegistartion() {
    if (!this.validateFields())
      return;
    this.errorText = null;
    this.isLoading = true;
    this.clientData.email = this.clientData.email.toLowerCase();
    this.clientData.preferWhatsapp = true;
    this.customerService.registerUsingPOST1(this.clientData).subscribe(
      res => {
        // this.router.navigate(['/confirm-email', this.clientData.email]);
        // window.scrollTo(0, 0);
        console.log('aaaaa');
      }, error => {
        this.isLoading = false;
        if (error.status == 409)
          this.errorText = "Этот email уже зарегистрирован";
        else
          this.errorText = "Произошла ошибка, попробуйте еще раз"
      });
  }

}
