import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // '/changepass/13pjfwnf2-f2-f'
  private profileHeaderRoutes = ['/sign-up', '/remind-password', '/mail-page', '/login', '/breeder-profile'];

  constructor(public appService: AppService, public popupService: PopupTemplateService, private http: HttpClient,
    private notificationService: NotificationBarService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void{
    this.http.get('/api/logout').subscribe(
      data =>  {
        this.appService.meData = { type: 'ANONYMOUS' };
        this.appService.userData = null;
        this.router.navigateByUrl('/breeder-landing');
      }, error => {
        this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
      }
    );
  }

  isHeaderForProfile(): boolean{
    let isProfile = this.profileHeaderRoutes.includes(this.router.url);
    if (!isProfile){
      isProfile = this.router.url.indexOf('/changepass/') != -1 || this.router.url.indexOf('/breeder/') != -1;
    }
    return isProfile;
  }

  openMyPage(): void{
    window.open('/breeder/' + this.appService.meData.id, '_blank');
  }

  showLoginPopup(){
    this.popupService.setCurrentForm('login');
    this.popupService.setShowStatus(true);
  }
}
