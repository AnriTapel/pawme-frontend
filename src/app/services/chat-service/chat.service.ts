import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

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
    return this.http.post(`/api/chat/${roomId}/message`, {text: message});
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
}
