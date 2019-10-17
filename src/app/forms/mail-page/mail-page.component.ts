import {Component, OnInit} from '@angular/core';
import { AppService } from '../../services/app-service/app.service';
import { BreederControllerService } from '../..';
import { NotificationBarService } from '../../services/nofitication-service/notification-bar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-mail-page',
    templateUrl: './mail-page.component.html',
    styleUrls: ['./mail-page.component.scss']
})
export class MailPageComponent implements OnInit {

    mail: string;

    constructor(private appService: AppService, private breederService: BreederControllerService, private router: Router,
        private notificationService: NotificationBarService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.mail = this.route.snapshot.paramMap.get('mail');
        if (this.mail.indexOf('@') != -1)
            this.mail = ' ' + this.mail;
        else if (this.mail == 'unconfirmed')
            this.mail = ', указанную при регистрации';
    }

    confirmEmailAgain(): void{
        this.breederService.confirmAgainUsingPOST().subscribe(
            () => {
                this.notificationService.setContext('Письмо успешно отправлено', true);
                this.notificationService.setVisibility(true);
            },
            (err) => {
                if (err.status == 403)
                    this.router.navigateByUrl('/login');
                else if (err.status == 429){
                    this.notificationService.setContext('Письмо уже было отправлено. Пожалуйста, подождите 5 минут перед повторной отправкой', false);
                    this.notificationService.setVisibility(true);
                }
                else {
                    this.notificationService.setContext('Не удалось отправить письмо, попробуйте еще раз', false);
                    this.notificationService.setVisibility(true);
                }
            }
        );
    }

}
