import { Component, OnInit } from '@angular/core';
import { RegisterCustomer } from 'src/app/model/registerCustomer';
import { AppService } from 'src/app/services/app-service/app.service';
import { CustomerControllerService } from 'src/app/api/api';
import { Router } from '@angular/router';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { NotificationBarService } from '../../services/nofitication-service/notification-bar.service';
import { BreederControllerService } from 'src/app/api/api';
import { HttpClient } from '@angular/common/http';




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
    phone: null
  };
  newClientAcception: boolean = true;
  errorText: string = null;
  isLoading: boolean = false;
  isOpen: boolean = false;

  credentials = { username: '', password: '' };
  loginError: boolean = false;
  
  constructor(
    public appService: AppService, 
    public customerService: CustomerControllerService, 
    private router: Router,
    public popupService: PopupTemplateService, 
    private notificationService: NotificationBarService,
    private breederService: BreederControllerService,
    private http: HttpClient) { }

  ngOnInit() {

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
        this.notificationService.setContext('Вы успешно зарегистрировались', true);
        this.notificationService.setVisibility(true);
        this.isLoading = false;
        this.popupService.setShowStatus(false);
        this.checkUserType();
        this.router.navigateByUrl('/chat');

      }, error => {
        this.isLoading = false;
        if (error.status == 409)
          this.errorText = "Этот email уже зарегистрирован";
        else
          this.errorText = "Произошла ошибка, попробуйте еще раз"
      });
  }

  private checkUserType() {
    this.breederService.meUsingGET().subscribe((me) => {
      this.appService.meData = me;
    });
  }
  clientLogin() {
    if (!this.validateFieldsLogin())
      return;
    this.isLoading = true;
   
    if (!this.appService.validateEmailInput(this.credentials.username)) {
      this.errorText = 'Пожалуйста, введите действительный E-mail';
      this.loginError = true;
      this.isLoading = false;
    } else {
      let body = new FormData();
      this.credentials.username = this.credentials.username.toLowerCase();
      body.append('username', this.credentials.username);
      body.append('password', this.credentials.password);

      this.http.post('/api/login', body, { responseType: 'text' }).subscribe(
        data => this.onLoginSuccess(),
        error => {
          this.errorText = "Неверный логин или пароль";
          this.loginError = true;
          this.isLoading = false;
        }
      );
    }
    
  }
  private onLoginSuccess(): void {
    this.breederService.meUsingGET().subscribe((me) => {
      this.appService.meData = me;
      if (me.type == 'CUSTOMER') {
        this.isLoading = false;
        this.popupService.setShowStatus(false);
        this.router.navigateByUrl('/chat');
      }
    }, (err) => {
      if (err.status == 423) {
        this.errorText = 'К сожалению, ваш аккаунт заблокирован. Help@petman.co';
        this.loginError = true;
      }
    });
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

  private validateFieldsLogin(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.credentials.username || this.credentials.username == '') {
      this.invalidFields.push('username');
      isValid = false;
    }

    if (!this.credentials.password || this.credentials.password == '') {
      this.invalidFields.push('password');
      isValid = false;
    }

    return isValid;
  }

}
