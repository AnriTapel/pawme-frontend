import {Component, OnInit} from '@angular/core';
import { AppService } from '../../services/app-service/app.service';
import { BreederControllerService } from '../..';
import { NotificationBarService } from '../../services/nofitication-service/notification-bar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-mail-page',
    templateUrl: './mail-page.component.html',
    styleUrls: ['./mail-page.component.scss']
})
export class MailPageComponent implements OnInit {

    mail: string;

    constructor(private appService: AppService, private breederService: BreederControllerService,
        private notificationService: NotificationBarService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.mail = this.route.snapshot.paramMap.get('mail');
    }

    confirmEmailAgain(): void{
        this.breederService.confirmAgainUsingPOST().subscribe(
            () => {
                this.notificationService.setContext('Письмо успешно отправлено', true);
                this.notificationService.setVisibility(true);
            },
            () => {
                this.notificationService.setContext('Не удалось отправить письмо, попробуйте еще раз', false);
                this.notificationService.setVisibility(true);
            }
        );
    }

}
