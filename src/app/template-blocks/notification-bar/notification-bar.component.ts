import { Component, OnInit } from '@angular/core';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {

  constructor(public notificationService: NotificationBarService) { }

  ngOnInit() {
  }

}
