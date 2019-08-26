import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  breederEmail: string;
  breederPassword: string;

  loginError: boolean = false;

  constructor(private popupService: PopupTemplateService, private appService: AppService) { }

  ngOnInit() {
  }

  loginBreeder(){
    this.loginError = false;
    if (!this.appService.validateEmailInput(this.breederEmail))
      return this.loginError = true;
      
  }

  switchToRemindPasswordForm(){
    this.popupService.setCurrentForm("remind-password");
  }

  switchToSignUpForm(){
    this.popupService.setCurrentForm("sign-up");
  }

}
