import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { BreederControllerService } from '../..';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit {

  remindEmail: string;
  remindError: boolean = false;
  mailSent: boolean = false;

  constructor(private appService: AppService, private breederService: BreederControllerService) { }

  ngOnInit() {
  }

  resetPassword(){
    if (!this.appService.validateEmailInput(this.remindEmail))
      return this.remindError = true;
  
    this.breederService.forgotPasswordUsingPOST(this.remindEmail).subscribe(
      (res) => this.mailSent = true,
      (error) => {
        this.mailSent = false;
        this.remindError = false;
      }
    );
  }

}
