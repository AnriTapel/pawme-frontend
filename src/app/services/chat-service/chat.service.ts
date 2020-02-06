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

  public getRooms() {
    return this.http.get('/api/chat/rooms');
  }

 
  public getMessages(roomId, params?) {
    return this.http.get(`/api/chat/${roomId}/history` + (params ? params : ''));
  }
}
