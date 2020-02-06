import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat-service/chat.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';

@Component({
  selector: 'app-first-message',
  templateUrl: './first-message.component.html',
  styleUrls: ['./first-message.component.scss']
})
export class FirstMessageComponent implements OnInit {
  @Input('params') params;
  message;

  constructor(
    private chatService: ChatService,
    public popupService: PopupTemplateService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  send() {
    if (this.message && this.message !== '')
      this.chatService.createRoom(this.params.breederId, this.message).subscribe(res => {
        console.log(res);
        this.popupService.setShowStatus(false);
        this.router.navigateByUrl('/chat/');
      })
  }

}
