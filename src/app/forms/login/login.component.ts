import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BreederControllerService, AdminControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  loginError: boolean = false;
  errorText: string = null;

  constructor(private appService: AppService, private router: Router, private http: HttpClient, private adminService: AdminControllerService,
    private breederService: BreederControllerService, private notificationService: NotificationBarService) {
    if (this.appService.meData.type == "BREEDER")
      this.router.navigateByUrl('/breeder-profile');
  }

  loginBreeder(): void {
    this.loginError = false;
    if (!this.appService.validateEmailInput(this.credentials.username))
      this.loginError = true;
    else {
      let body = new FormData();
      this.credentials.username = this.credentials.username.toLowerCase();
      body.append('username', this.credentials.username);
      body.append('password', this.credentials.password);

      this.http.post('/api/login', body, { responseType: 'text' }).subscribe(
        data => this.onLoginSuccess(),
        error => {
          this.errorText = "Неверный логин или пароль";
          this.loginError = true;
        }
      );
    }
  }

  private onLoginSuccess(): void {
    this.breederService.meUsingGET().subscribe((me) => {
      scroll(0, 0);
      this.appService.meData = me;
      if (me.type == 'BREEDER')
        this.breederService.getBreederUsingGET(me.id).subscribe(res => {
          this.appService.userData = res;
          this.router.navigateByUrl('/breeder-profile');
        });
      else if (me.type == 'ADMIN')
        this.router.navigateByUrl('/admin-panel');
      else
        this.router.navigateByUrl('/breeder-landing');
    }, (err) => {
      if (err.status == 423) {
        this.errorText = 'К сожалению, ваш аккаунт заблокирован. Help@petman.co';
        this.loginError = true;
      }
    });
  }
}
