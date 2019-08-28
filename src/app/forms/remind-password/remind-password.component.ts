import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind-password.component.html',
  styleUrls: ['./remind-password.component.scss']
})
export class RemindPasswordComponent implements OnInit {

  remindEmail: string;
  remindError: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  resetPassword(){
    if (!this.appService.validateEmailInput(this.remindEmail))
      return this.remindError = true;
  }

}
