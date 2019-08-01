import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/template-blocks/popup-template/popup-template.service';

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

  constructor(private popupService: PopupTemplateService) { }

  ngOnInit() {
  }

  switchToLoginForm(){
    this.popupService.setCurrentForm("login");
  }

  signUpNewBreeder(){
    console.log({
      name: this.newBreederName,
      lastname: this.newBreederLastname,
      email: this.newBreederEmail,
      password: this.newBreederPassword,
      acception: this.newBreederAcception
    });
  }

}
