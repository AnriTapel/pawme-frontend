import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { BreederControllerService } from 'src/app/api/breederController.service';
import { RegisterBreeder } from 'src/app/model/registerBreeder';

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

  newBreederAcception: boolean = false;

  invalidFields: any[] = [];

  constructor(private popupService: PopupTemplateService, private appService: AppService,
    private breederService: BreederControllerService) { }

  ngOnInit() {
  }

  switchToLoginForm(){
    this.popupService.setCurrentForm("login");
  }

  signUpNewBreeder(){
    if (!this.validateFields())
      return;
    this.breederService.registerUsingPOST(this.breederData).subscribe(res => {
      console.log(res);
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
