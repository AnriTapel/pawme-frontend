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

  constructor(private popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  loginBreeder(){
    console.log({
      email: this.breederEmail,
      password: this.breederPassword
    });
  }

  switchToRemindPasswordForm(){
    this.popupService.setCurrentForm("remind-password");
  }

  switchToSignUpForm(){
    this.popupService.setCurrentForm("sign-up");
  }

}
