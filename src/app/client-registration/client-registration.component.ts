import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../services/popup-service/popup-template.service';
import { BreederControllerService } from 'src/app/api/api';
import { AppService } from 'src/app/services/app-service/app.service';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {

  constructor(
    private popupService: PopupTemplateService,
    private breederService: BreederControllerService,
    public appService: AppService,
    private notificationService: NotificationBarService,
    private router: Router) { }

  ngOnInit() {
    this.breederService.meUsingGET().subscribe((me) => {
      this.appService.meData = me;
    });
  }

  showBreederMessagePopup(): void {
    if (this.appService.meData.type == 'BREEDER') {
      this.notificationService.setContext('Пожалуйста, выйдите из аккаунта заводчика', false);
      this.notificationService.setVisibility(true);
    }
    else if (this.appService.meData.type == 'CUSTOMER') {
      this.router.navigateByUrl('/chat');
    } else  {
      this.popupService.setCurrentForm('client-chat');
      this.popupService.setShowStatus(true);
    }

  }

}
