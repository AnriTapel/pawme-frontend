import {Component, OnInit} from '@angular/core';
import { AppService } from '../../services/app-service/app.service';
import { BreederControllerService } from '../..';
import { NotificationBarService } from '../../services/nofitication-service/notification-bar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mail-page',
    templateUrl: './mail-page.component.html',
    styleUrls: ['./mail-page.component.scss']
})
export class MailPageComponent implements OnInit {

    mail: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.mail = this.route.snapshot.paramMap.get('mail');
    }

}
