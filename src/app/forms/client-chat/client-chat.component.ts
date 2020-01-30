import { Component, OnInit } from '@angular/core';
import { RegisterCustomer } from 'src/app/model/registerCustomer';
import { AppService } from 'src/app/services/app-service/app.service';
import { CustomerControllerService } from 'src/app/api/api';
import { Router } from '@angular/router';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { NotificationBarService } from '../../services/nofitication-service/notification-bar.service';



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
  isOpen: boolean = false;

  constructor(
    public appService: AppService, 
    public customerService: CustomerControllerService, 
    private router: Router,
    public popupService: PopupTemplateService, 
    private notificationService: NotificationBarService) { }

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
    this.customerService.registerUsingPOST1(this.clientData).subscribe(
      res => {
        // window.scrollTo(0, 0);
        this.notificationService.setContext('Письмо заводчику успешно отправлено', true);
        this.notificationService.setVisibility(true);
        this.isLoading = false;
        this.popupService.setShowStatus(false);
        console.log('res', res);
         //@ts-ignore
        // window.intercomSettings.name = res.name;
         //@ts-ignore
         window.intercomSettings.user_id = res.id;
         //@ts-ignore
        // window.intercomSettings['breeder_page_url'] = 'https://dev.petman.co/chat/' + res.id;
        //this.appService.userData.id = res.id;
         //this.router.navigate(['/chat']);
         this.router.navigateByUrl('/chat');
      
      }, error => {
        this.isLoading = false;
        if (error.status == 409)
          this.errorText = "Этот email уже зарегистрирован";
        else
          this.errorText = "Произошла ошибка, попробуйте еще раз"
      });
  }

  clientLogin() {
    console.log('login');
    if (!this.validateFields())
    return;
  }

}
