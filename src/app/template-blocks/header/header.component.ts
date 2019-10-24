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

  private nonProfileHeaderPathnames = ['/breeder-landing', '/?'];

  constructor(public appService: AppService, public popupService: PopupTemplateService, private http: HttpClient,
    private notificationService: NotificationBarService, private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.http.get('/api/logout').subscribe(
      data => {
        this.appService.meData = { type: 'ANONYMOUS' };
        this.appService.userData = null;
        //@ts-ignore
        window.intercomSettings.name = null;
        //@ts-ignore
        window.intercomSettings.user_id = null;
        //@ts-ignore
        window.intercomSettings['breeder_page_url'] = null;
        this.router.navigateByUrl('/breeder-landing');
      }, error => {
        this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
      }
    );
  }

  isNonProfileHeader(): boolean {
    return this.nonProfileHeaderPathnames.filter(it => this.router.url.indexOf(it) == 0).length != 0 || this.router.url == '/';
  }

  getMenuType(): MenuType {
    if (this.appService.meData.type == 'ANONYMOUS' || this.appService.meData.type == 'BLOCKED')
      return MenuType.LOGIN;
    if (this.appService.userData && this.appService.userData.id != this.appService.meData.id)
      return MenuType.LOGIN;
    else
      return MenuType.MENU
  }

  openMyPage(): void {
    window.open('/breeder/' + this.appService.meData.id, '_blank');
  }
}

export enum MenuType {
  'LOGIN',
  'MENU'
}
