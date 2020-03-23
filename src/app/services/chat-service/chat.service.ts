import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatToken;
  ws;
  wsEvents = new EventEmitter;

  constructor(private http: HttpClient) { }

  public getToken() {
    return this.http.get('/api/chat/token');
  }

  public createRoom(breederId: string, message: string) {
    let obj = {
      text: message
    }
    return this.http.post('/api/chat/room/' + breederId, obj);
  }

  public sendMessage(roomId, message) {
    return this.http.post(`/api/chat/${roomId}/message`, { text: message });
  }
  public inviteSupport(roomId) {
    return this.http.post(`/api/chat/${roomId}/summon`, {});
  }
  public unSupport(roomId) {
    return this.http.post(`/api/chat/${roomId}/unsummon`, {});
  }

  public getRooms() {
    return this.http.get('/api/chat/rooms');
  }

  public getRoomsAdmin() {
    return this.http.get('/api/chat/admin/rooms');
  }


  public getMessages(roomId, params?) {
    return this.http.get(`/api/chat/${roomId}/history` + (params ? params : ''));
  }

  wsInit() {
    this.getToken().subscribe((data: any) => {
      this.chatToken = data.token;
      this.ws = new WebSocket(`wss://${window.origin === 'https://petman.co' ? '' : 'dev.'}petman.co/ws/chat/` + this.chatToken);

      this.ws.onopen = (e) => {
        this.wsEvents.emit(({
          eventName: 'onopen',
          data: null
        }));
      };
      this.ws.onmessage = (message) => {
        this.wsEvents.emit(({
          eventName: 'onmessage',
          data: message
        }));
      };
      this.ws.onclose = () => {
        // Try to reconnect in 5 seconds
        this.wsEvents.emit(({
          eventName: 'onclose',
          data: null
        }));
        this.wsInit();
      };
    });
  }

  wsSend(obj) {
    this.ws.send(JSON.stringify(
      {
        roomId: obj.roomId,
        lastRead: obj.lastRead
      }
    ));
  }
}
