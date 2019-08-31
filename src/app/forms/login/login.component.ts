import { Component, ViewChild } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  loginError: boolean = false;

  constructor(private popupService: PopupTemplateService, private appService: AppService, private router: Router) { }

  loginBreeder() {
    this.loginError = false;
    if (!this.appService.validateEmailInput(this.credentials.username))
      return this.loginError = true;

    this.appService.authenticateBreeder(this.credentials).subscribe((res) => {
      this.router.navigateByUrl('/breeder-profile')
    });
    return false;
  }

  switchToRemindPasswordForm() {
    this.popupService.setCurrentForm("remind-password");
  }

  switchToSignUpForm() {
    this.popupService.setCurrentForm("sign-up");
  }

}
