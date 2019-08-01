import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  breederEmail: string;
  breederPassword: string;

  constructor() { }

  ngOnInit() {
  }

  loginBreeder(){
    console.log({
      email: this.breederEmail,
      password: this.breederPassword
    });
  }

}
