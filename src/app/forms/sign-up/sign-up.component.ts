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
    name: "",
    surname: "",
    email: "",
    password: ""
  }

  newBreederAcception: boolean = true;

  invalidFields: any[] = [];
  errorText: string = null;

  constructor(private popupService: PopupTemplateService, private appService: AppService,
    private breederService: BreederControllerService, private router: Router) { }

  ngOnInit() {
  }

  switchToLoginForm(){
    this.popupService.setCurrentForm("login");
  }

  signUpNewBreeder(){
    if (!this.validateFields())
      return;
    this.errorText = null;
    this.breederData.email = this.breederData.email.toLowerCase();
    this.breederService.registerUsingPOST(this.breederData).subscribe(
    res => {
      this.router.navigate(['/confirm-email', this.breederData.email]);
    },error => {
      if (error.status == 409)
        this.errorText = "Этот email уже зарегистрирован";
      else
        this.errorText = "Произошла ошибка, попробуйте еще раз"
    });
  }

  validateFields(): boolean{
    this.invalidFields = [];
    let isValid = true;
    if (!this.breederData.name || this.breederData.name == ""){
      isValid = false;
      this.invalidFields.push("name");
    }

    if (!this.breederData.surname || this.breederData.surname == ""){
      isValid = false;
      this.invalidFields.push("lastname");
    }

    if (!this.breederData.email || this.breederData.email == ""
        || !this.appService.validateEmailInput(this.breederData.email)){
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.breederData.password || this.breederData.password == ""){
      isValid = false;
      this.invalidFields.push("password");
    }

    if (!this.newBreederAcception){
      isValid = false;
      this.invalidFields.push("acception");
    }

    return isValid;
  }
}
