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
  errorText: string;
  mailSent: boolean = false;
  isLoading: boolean = false;

  constructor(private appService: AppService, private breederService: BreederControllerService) { }

  ngOnInit() {
    document.body.style.overflowY = 'scroll';
  }

  ngOnDestroy() {
    document.body.removeAttribute('style');
  }

  resetPassword(){
    if (!this.appService.validateEmailInput(this.remindEmail))
      return this.remindError = true;
      this.isLoading = true;
  
    this.breederService.forgotPasswordUsingPOST(this.remindEmail.toLowerCase()).subscribe(
      (res) => this.mailSent = true,
      (error) => {
        if (error.status == 429) {
          this.isLoading = false;
          this.errorText = 'Письмо уже было отправлено. Пожалуйста, подождите 5 минут перед повторной отправкой';
        }
        
        else
        this.errorText = 'Пользователь с таким Email не зарегистрирован'; 
        this.mailSent = false;
        this.remindError = true;
      }
    );
  }

}
