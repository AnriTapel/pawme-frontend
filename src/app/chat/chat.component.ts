import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat-service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatToken;
  ws
  constructor(private chatService: ChatService) { 
    this.chatService.getToken().subscribe((data: any) => {
      this.chatToken = data.token;
      console.log(data);
      this.ws = new WebSocket("wss://dev.petman.co/ws/chat/" + this.chatToken);
      this.ws.onopen = function(e) {
      };
    });
 
  }

  ngOnInit() {
  }

}
