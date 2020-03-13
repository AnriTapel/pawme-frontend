import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat-service/chat.service';
import { AppService } from '../services/app-service/app.service';
import { SharedService } from '../services/shared-services/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('chatWrap', { static: true }) chatWrap;

  selectedTab = 'all';
  selectedTabAdmin;

  message;
  chatToken;
  ws;
  meData: any;
  rooms;
  selectedRoom: any = {
    id: ''
  }
  listUser = {};
  json = JSON;
  history;

  meSendFlag;

  allUnreadCount = 0;
  allFlagsCount = 0;
  canInviteSuppotr = true;
  canInviteIntervar;

  showChatsListMobile = true;

  isDestroy;

  isEndOfHistory;

  constructor(
    private chatService: ChatService,
    private appService: AppService,
    private ref: ChangeDetectorRef,
    private sharedService: SharedService
  ) {

    this.meData = this.appService.meData;
    console.log(this.meData.type);

    if (this.meData.type !== 'ANONYMOUS') {
      this.socketInit();
      if (this.meData.type === "ADMIN") {
        this.selectedTabAdmin = 'active';
        this.chatService.getRoomsAdmin().subscribe((rooms: any) => {
          rooms.forEach(element => {
            if (element.summonAdmin)
              this.allFlagsCount++
          });
          this.roomsInit(rooms).then(() => this.readMessage());
        });
      } else {
        this.chatService.getRooms().subscribe(rooms => {
          this.roomsInit(rooms).then(() => this.readMessage());
        });
      }
    }



    this.sharedService.headerType.emit('2')
  }

  ngOnDestroy(): void {
    this.sharedService.headerType.emit('1');
    console.log('ceerfff la');
    this.isDestroy = true;
  }

  ngOnInit() {
    if (localStorage.getItem('inviteSupportTime') && +localStorage.getItem('meId') === +this.meData.id) {
      let endDate = moment(localStorage.getItem('inviteSupportTime')).add(15, 'minutes');
      this.canInviteIntervar = setInterval(() => {
        this.canInviteSuppotr = !moment().isBetween(localStorage.getItem('inviteSupportTime'), endDate, 'minutes', '[]');
      }, 30000);
      this.canInviteSuppotr = !moment().isBetween(localStorage.getItem('inviteSupportTime'), endDate, 'minutes', '[]');
    }
  }

  roomsInit(rooms) {
    return new Promise((resolve) => {
      this.rooms = rooms;
      this.rooms.forEach(element => {
        this.allUnreadCount += element.unreadCount
      });
      this.selectedRoom = this.rooms[0];
      this.rooms.forEach(element => {
        element.users.forEach(ures => {
          this.listUser[ures.id] = ures;
        });

      });

      if (this.selectedRoom)
        this.chatService.getMessages(this.selectedRoom.id).subscribe(history => {
          this.history = history;
          let interval = setInterval(() => {
            if (this.chatWrap && this.chatWrap.nativeElement) {
              this.chatWrap.nativeElement.scrollTop = this.chatWrap.nativeElement.scrollHeight;
              clearInterval(interval);
            }
          }, 50);
        });
    });

  }

  socketInit() {
    return new Promise(resolve => {
      this.chatService.getToken().subscribe((data: any) => {
        this.chatToken = data.token;
        this.ws = new WebSocket("wss://dev.petman.co/ws/chat/" + this.chatToken);
        this.ws.onopen = function (e) {
          resolve('isOpen')
        };
        this.ws.onmessage = (message) => {

          if (!this.isDestroy) {
            let response = JSON.parse(message.data);

            console.log(response, 'JSON.parse(message.data)');

            let hasRoom;

            this.rooms.forEach(room => {
              if (response.roomId === room.id) {
                hasRoom = true;
              }
            });
            if (!hasRoom) {
              this.chatService.getRooms().subscribe(rooms => {
                this.rooms = rooms;
                this.allUnreadCount++;
                if (!this.ref['destroyed']) {
                  this.ref.detectChanges();
                }
              });
            }

            if (response.type === "msg" || response.type === "admin") {

              response.read = false;

              if (response.roomId === this.selectedRoom.id) {

                // if (this.chatWrap.nativeElement.scrollTop === this.chatWrap.nativeElement.scrollHeight - this.chatWrap.nativeElement.clientHeight) {
                //   this.chatWrap.nativeElement.scrollTop = 10000;
                // }

                this.history.messages.push(response);
                if (this.meData.id !== response.id && !this.showChatsListMobile) {
                  setTimeout(() => {
                    // if (this.chatWrap.nativeElement.scrollTop === this.chatWrap.nativeElement.scrollHeight - this.chatWrap.nativeElement.clientHeight) {
                    this.readMessage();
                    if (this.isEndOfHistory) {
                      this.chatWrap.nativeElement.scrollTop = this.chatWrap.nativeElement.scrollHeight;
                    }
                    // }
                  }, 100);
                }

                let intervar = setInterval(() => {
                  if (this.isEndOfHistory) {
                    if (document.getElementsByClassName('massage-counter') && this.history.messages.length === document.getElementsByClassName('massage-counter').length) {
                      this.chatWrap.nativeElement.scrollTop = this.chatWrap.nativeElement.scrollHeight;
                      clearInterval(intervar);
                    }
                  } else {
                    clearInterval(intervar);
                  }
                }, 500);
              }

              this.rooms.forEach(room => {
                if (room.id === response.roomId) {
                  room.messages[0] = response;
                  if (response.senderId !== this.meData.id) {
                    room.unreadCount++;
                    this.allUnreadCount++;
                  }
                }
              });


              if (!this.ref['destroyed']) {
                this.ref.detectChanges();
              }
              if (this.meSendFlag) {
                this.chatWrap.nativeElement.scrollTop = this.chatWrap.nativeElement.scrollHeight;
                this.meSendFlag = false;
              }

            } else {
              if (response.roomId === this.selectedRoom.id) {

                let BreakException = {};
                try {
                  this.history.messages.forEach((element, index) => {
                    if (element.hasOwnProperty('read')) {
                      this.history.messages[index].read = true;
                    }
                    if (element.id === response.lastReadMsgId) {
                      throw BreakException;
                    }
                  });
                } catch (e) {
                  if (e !== BreakException) throw e;
                }
              }
            }
          }
        };
        this.ws.onclose = () => {
          // Try to reconnect in 5 seconds
          this.socketInit()
        };
      });

    })

  }

  ngAfterViewInit() {
  }

  getFilter(query) {
    let filter = '?';
    if (query && Object.keys(query).length > 0) {
      for (const key in query) {
        if (query.hasOwnProperty(key) && (query[key] != undefined)) {
          const element = query[key];
          filter += key + '=' + element + (Object.keys(query).indexOf(key) !== Object.keys(query).length - 1 ? '&' : '');
        }
      }
    }
    return filter;
  }

  sendMessage() {
    if (this.message && this.message !== '' && this.message !== "↵") {

      this.meSendFlag = true;
      this.chatService.sendMessage(this.selectedRoom.id, this.message).subscribe(res => {
        // let newMessage = {
        //   // roomId = message id
        //   id: res['roomId'],
        //   timestamp: new Date(),
        //   type: "msg",
        //   body: this.message,
        //   senderId: this.meData.id,
        //   roomId: this.selectedRoom.id
        // }

        if (this.ws.readyState === this.ws.OPEN) {
          // this.ws.send(newMessage);
        } else {
          this.socketInit().then(data => { });
        }
        this.message = null;
      })
    }
  }

  selectRoom(room) {
    this.showChatsListMobile = false;
    this.allUnreadCount -= room.unreadCount;
    room.unreadCount = 0
    this.selectedRoom = room;
    this.chatService.getMessages(this.selectedRoom.id).subscribe(history => {
      this.sharedService.updateNotifMessage.emit(this.allUnreadCount);
      this.history = history;
      console.log(this.history, 'this.history');

      this.readMessage();
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
      this.chatWrap.nativeElement.scrollTop = this.chatWrap.nativeElement.scrollHeight;
    });
  }

  scrollTop() {

    if (this.chatWrap.nativeElement.scrollTop === 0) {
      let query = {
        last: this.history.messages[0].id,
        count: 10
      }

      this.chatService.getMessages(this.selectedRoom.id, this.getFilter(query)).subscribe(history => {

        if (history['messages'].length) {
          let arr = [...history['messages'], ...this.history['messages']];

          let scrollHeight1 = this.chatWrap.nativeElement.scrollHeight;

          this.history['messages'] = arr;
          if (!this.ref['destroyed']) {
            this.ref.detectChanges();
          }

          let scrollHeight2 = this.chatWrap.nativeElement.scrollHeight;
          this.chatWrap.nativeElement.scrollTop = scrollHeight2 - scrollHeight1;

        }

        // setTimeout(() => {
        //   this.chatWrap.nativeElement.scrollTop = this.chatWrap.nativeElement.scrollHeight;
        // }, 50);

      });
    }

    if (this.chatWrap.nativeElement.scrollTop === this.chatWrap.nativeElement.scrollHeight - this.chatWrap.nativeElement.clientHeight) {
      // this.readMessage();
      this.isEndOfHistory = true;
    } else {
      this.isEndOfHistory = false;
    }

  }

  readMessage() {
    this.rooms.forEach((element, index) => {
      if (this.selectedRoom.id === element.id) {
        this.allUnreadCount -= this.rooms[index].unreadCount;
        this.sharedService.updateNotifMessage.emit(this.allUnreadCount);
        this.rooms[index].unreadCount = 0;
      }
    });

    for (let i = this.history['messages'].length - 1; i !== -1; i--) {
      if (this.history['messages'][i].senderId !== this.meData.id) {
        console.log(this.history['messages'][i], 'this.history[asdsa][i]');

        this.ws.send(JSON.stringify(
          {
            roomId: this.selectedRoom.id,
            lastRead: this.history['messages'][i].id
          }
        ));
        break;
      }
    }
  }

  checkInviteSupportTime() {
    clearInterval(this.canInviteIntervar);
    if (localStorage.getItem('inviteSupportTime') && +localStorage.getItem('meId') === +this.meData.id) {
      let endDate = moment(localStorage.getItem('inviteSupportTime')).add(15, 'minutes');
      this.canInviteIntervar = setInterval(() => {
        this.canInviteSuppotr = !moment().isBetween(localStorage.getItem('inviteSupportTime'), endDate, 'minutes', '[]');
      }, 30000);
      return this.canInviteSuppotr = !moment().isBetween(localStorage.getItem('inviteSupportTime'), endDate, 'minutes', '[]');
    } else {
      return false;
    }
  }

  inviteSupport() {
    if (!this.checkInviteSupportTime()) {
      this.canInviteSuppotr = false;
      let date = moment();
      localStorage.setItem('inviteSupportTime', date.format());
      localStorage.setItem('meId', this.meData.id);

      this.chatService.inviteSupport(this.selectedRoom.id).subscribe(res => {
        if (this.ws.readyState === this.ws.OPEN) {
          // this.ws.send(newMessage);
        } else {
          this.socketInit().then(data => { });
        }
      });
    }
  }
  unSupport(room) {
    let selectedTab = this.selectedTabAdmin;
    this.selectedTabAdmin = 'update';
    this.chatService.unSupport(room.id).subscribe(res => {
      room.summonAdmin = false;
      this.allFlagsCount--;
      this.selectedTabAdmin = selectedTab;
    })
  }

}
