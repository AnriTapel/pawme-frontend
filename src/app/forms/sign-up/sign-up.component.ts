import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newBreederName: string = "";
  newBreederLastname: string = "";
  newBreederEmail: string = "";
  newBreederPassword: string = "";
  newBreederAcception: boolean = false;

  invalidFields: any[] = [];

  constructor(private popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  switchToLoginForm(){
    this.popupService.setCurrentForm("login");
  }

  signUpNewBreeder(){
    if (!this.validateFields())
      return;
    
      console.log("Form is valid");
  }

  validateFields(): boolean{
    this.invalidFields = [];
    let isValid = true;
    if (!this.newBreederName || this.newBreederName == ""){
      isValid = false;
      this.invalidFields.push("name");
    }

    if (!this.newBreederLastname || this.newBreederLastname == ""){
      isValid = false;
      this.invalidFields.push("lastname");
    }

    if (!this.newBreederEmail || this.newBreederEmail == "" || !this.popupService.validateEmailInput(this.newBreederEmail)){
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.newBreederPassword || this.newBreederPassword == ""){
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
