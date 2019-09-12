import { Component, OnInit } from '@angular/core';
import { BreederControllerService } from '../..';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  uuid: string = null;
  newPassword = null;
  repeatPassword = null;
  matchError: boolean = false;
  respError: boolean = false;

  constructor(private breederService: BreederControllerService, private route: ActivatedRoute, private notificationService: NotificationBarService,
      private router: Router) {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
  }

  ngOnInit() {
  }

  changePassword(): void{
    this.respError = false;
    this.matchError = false;
    if (this.newPassword !== this.repeatPassword){
      this.matchError = true;
      return;
    }

    this.breederService.changePasswordUsingPOST(this.newPassword, this.uuid).subscribe(
      () => {
        this.router.navigateByUrl('/login');
        scroll(0,0);
        this.notificationService.setContext('Пароль успешно изменен', true);
        this.notificationService.setVisibility(true);
      },
      () => {
        this.respError = true;
        scroll(0,0);
      }
    );

  }

}
