import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { BreederControllerService } from 'src/app/api/breederController.service';
import { RegisterBreeder } from 'src/app/model/registerBreeder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  breederData: RegisterBreeder = {
    name: null,
    surname: null,
    phone: null,
    email: null,
    password: null
  }

  newBreederAcception: boolean = true;

  invalidFields: any[] = [];
  errorText: string = null;
  isLoading: boolean = false;

  constructor(private popupService: PopupTemplateService, public appService: AppService,
    private breederService: BreederControllerService, private router: Router) { scroll(0, 0) }

  ngOnInit() {
    document.body.style.overflowY = 'scroll';
    this.breederData.email = this.appService.meData['newBreederEmail'];
  }

  ngOnDestroy() {
    document.body.removeAttribute('style');
  }

  switchToLoginForm() {
    this.popupService.setCurrentForm("login");
  }

  signUpNewBreeder() {
    console.log('this.breederData', this.breederData);
    if (!this.validateFields())
      return;
    this.errorText = null;
    this.isLoading = true;
    this.breederData.email = this.breederData.email.toLowerCase();
    this.breederService.registerUsingPOST(this.breederData).subscribe(
      res => {
        //@ts-ignore
        ym(55779592, 'reachGoal', 'Registration');
        //@ts-ignore
        gtag('event', 'Registration');
       
        this.router.navigate(['/confirm-email', this.breederData.email]);
        window.scrollTo(0, 0);
      }, error => {
        this.isLoading = false;
        if (error.status == 409)
          this.errorText = "Этот email уже зарегистрирован";
        else
          this.errorText = "Произошла ошибка, попробуйте еще раз"
      });
  }

  fieldEdited(field: string): void {
    this.invalidFields = this.invalidFields.filter(it => it != field);
  }

  validateFields(): boolean {
    this.invalidFields = [];
    let isValid = true;
    if (!this.breederData.name || this.breederData.name == "" || this.breederData.name.length < 2 || this.breederData.name.length > 30) {
      isValid = false;
      this.invalidFields.push("name");
    }

    if (!this.breederData.surname || this.breederData.surname == ""
      || this.breederData.surname.length < 2 || this.breederData.surname.length > 30) {
      isValid = false;
      this.invalidFields.push("lastname");
    }

    if (!this.breederData.phone || this.breederData.phone == ""
      || this.breederData.phone.length != 17) {
      if (this.breederData.phone.length == 18)
        this.breederData.phone = this.breederData.phone.substr(0, 17);
      else {
        isValid = false;
        this.invalidFields.push("phone");
      }
    }

    if (!this.breederData.email || this.breederData.email == ""
      || !this.appService.validateEmailInput(this.breederData.email)) {
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.breederData.password || this.breederData.password == ""
      || this.breederData.password.length < 2 || this.breederData.password.length > 30) {
      isValid = false;
      this.invalidFields.push("password");
    }

    if (!this.newBreederAcception) {
      isValid = false;
      this.invalidFields.push("acception");
    }

    return isValid;
  }
}
