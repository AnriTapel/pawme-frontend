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

  public createRoom(breederId) {
    return this.http.post('/api/chat/room/' + breederId, {});
  }

  public sendMessage(roomId) {
    return this.http.post(`/api/chat/${roomId}/message`, {text: ''});
  }

  public getRooms() {
    return this.http.get('/api/chat/rooms');
  }

  public getMessages(roomId) {
    return this.http.get(`/api/chat/${roomId}/history?last=123&count=10`);
  }
}
