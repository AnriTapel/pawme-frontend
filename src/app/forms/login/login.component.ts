import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/template-blocks/popup-template/popup-template.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  breederEmail: string;
  breederPassword: string;

  loginError: boolean = false;

  constructor(private popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  loginBreeder(){
    this.loginError = false;
    if (!this.popupService.validateEmailInput(this.breederEmail))
      return this.loginError = true;
      
  }

  switchToRemindPasswordForm(){
    this.popupService.setCurrentForm("remind-password");
  }

  switchToSignUpForm(){
    this.popupService.setCurrentForm("sign-up");
  }

}
