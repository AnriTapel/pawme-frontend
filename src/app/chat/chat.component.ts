import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat-service/chat.service';
import { AppService } from '../services/app-service/app.service';
import { SharedService } from '../services/shared-services/shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

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

  constructor(
    private chatService: ChatService,
    private appService: AppService,
    private ref: ChangeDetectorRef,
    private sharedService: SharedService
  ) {

    this.meData = this.appService.meData;
    console.log(this.meData.type === "ADMIN");

    this.socketInit();
    if (this.meData.type === "ADMIN") {
      this.selectedTabAdmin = 'active';
      this.chatService.getRoomsAdmin().subscribe((rooms: any) => {
        console.log(rooms, 'asd');
        rooms.forEach(element => {
          if (element.summonAdmin)
            this.allFlagsCount++
        });
        this.roomsInit(rooms);
      });
    } else {
      this.chatService.getRooms().subscribe(rooms => {
        this.roomsInit(rooms);
      });
    }
  }

  ngOnInit() {
  }

  roomsInit(rooms) {
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

          let response = JSON.parse(message.data);

          console.log(message.data);

          if (response.type === "msg" || "admin") {
            response.read = false;
            if (response.roomId === this.selectedRoom.id) {
              this.history.messages.push(response);
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
    this.allUnreadCount -= room.unreadCount;
    room.unreadCount = 0
    this.selectedRoom = room;
    this.chatService.getMessages(this.selectedRoom.id).subscribe(history => {
      this.sharedService.updateNotifMessage.emit(this.allUnreadCount);
      this.history = history;
      console.log(this.history, 'this.history');

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

      this.rooms.forEach((element, index) => {
        if (this.selectedRoom.id === element.id) {
          this.allUnreadCount -= this.rooms[index].unreadCount;
          this.rooms[index].unreadCount = 0;
        }
      });

      for (let i = this.history['messages'].length - 1; i !== -1; i--) {
        if (this.history['messages'][i].senderId !== this.meData.id) {
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

  }

  inviteSupport() {
    this.chatService.inviteSupport(this.selectedRoom.id).subscribe(res => {
      console.log(res, 'inviteSupport');
      if (this.ws.readyState === this.ws.OPEN) {
        // this.ws.send(newMessage);
      } else {
        this.socketInit().then(data => { });
      }
    })
  }
  unSupport(room) {
    console.log();
    let selectedTab = this.selectedTabAdmin;
    this.selectedTabAdmin = 'update';
    this.chatService.unSupport(room.id).subscribe(res => {
      console.log(res, 'unSupport');
      room.summonAdmin = false;
      this.allFlagsCount--;
      this.selectedTabAdmin = selectedTab;
    })
  }

}
