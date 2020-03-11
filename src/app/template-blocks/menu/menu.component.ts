import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  menuItems = [
    {
      name: 'Топ заводчиков',
      url: '/search-page'
    },
    {
      name: 'База знаний',
      url: '/articles'
    }
  ];

  allUnreadCount = 0;
  
  private nonProfileHeaderPathnames = ['/breeder-landing', '/?', '/chat'];


  @Input() showMenu: boolean;
  @Input() state: boolean;
  @Output('detectChangeTopMenu') detectChangeTopMenu: EventEmitter<any> = new EventEmitter();


  constructor(
    public appService: AppService,
    public router: Router,
    private notificationService: NotificationBarService,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 400) {
      this.state = true;
    } else {
      this.state = false;
    }
  }
  reloadTopBreeder(item) {
    this.detectChangeTopMenu.emit(item);
  }

  getMenuType(): MenuType {
    if (this.appService.meData.type == 'ANONYMOUS' || this.appService.meData.type == 'BLOCKED') {
      return MenuType.LOGIN;
    }
    // if (this.appService.userData && this.appService.userData.id != this.appService.meData.id)
    //   return MenuType.LOGIN;
    if (this.appService.meData.type == 'CUSTOMER' || this.appService.meData.type == 'ADMIN') {
      return MenuType.CUSTOMER;
    }
    else {
      return MenuType.MENU
    }
  }

  openMyPage(): void {
    window.open('/breeder/' + this.appService.meData.id, '_blank');
  }
  openChat(): void {
    window.open('/chat/', '_blank');
  }
  openChatCustomer(): void {
    this.router.navigate(['/chat'])
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
        //@ts-ignore
        window.intercomSettings.email = null;
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

}

export enum MenuType {
  'LOGIN',
  'MENU',
  'CUSTOMER'
}
