import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { SharedService } from 'src/app/services/shared-services/shared.service';


@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss']
})
export class UserIconComponent implements OnInit, OnDestroy {

  @Output('unreadCount') unreadCount = new EventEmitter;

  allUnreadCount = 0;

  rooms;
  meData;
  wsEventsSubscribe;

  private nonProfileHeaderPathnames = ['/breeder-landing', '/?', '/chat'];

  constructor(
    public appService: AppService,
    public popupService: PopupTemplateService,
    private http: HttpClient,
    private notificationService: NotificationBarService,
    public router: Router,
    private chatService: ChatService,
    private sharedService: SharedService
  ) { }
  ngOnDestroy(): void {
    this.wsEventsSubscribe.unsubscribe();
  }

  ngOnInit() {

    this.meData = this.appService.meData;

    this.wsEventsSubscribe = this.chatService.wsEvents.subscribe(res => {
      if (res.eventName === 'onmessage' && res.data) {
        this.initChatMess();
      }
    });

    if (this.meData.type !== "ADMIN" && this.meData.type !== "ANONYMOUS") {
      this.initChatMess();
    }

    let subscriber = this.sharedService.updateNotifMessage;
    subscriber.subscribe((res) => {
      if (res || res === 0) {
        this.allUnreadCount = +res;
        this.unreadCount.emit(this.allUnreadCount);
      } else {
        console.log('getRooms()getRooms()getRooms()');

        this.initChatMess();
      }
    });
  }

  initChatMess() {
    this.chatService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      this.allUnreadCount = 0;
      this.rooms.forEach(element => {
        this.allUnreadCount += element.unreadCount
      });
      this.unreadCount.emit(this.allUnreadCount);
    });
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
}

export enum MenuType {
  'LOGIN',
  'MENU',
  'CUSTOMER'
}
