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
  invalidFields: string[] = [];
  isLoading: boolean = false;

  constructor(private appService: AppService, private router: Router, private http: HttpClient, private adminService: AdminControllerService,
    private breederService: BreederControllerService, private notificationService: NotificationBarService) {
    if (this.appService.meData.type == "BREEDER"){
      if (this.appService.userData.id == this.appService.meData.id)
        this.router.navigateByUrl('/breeder-profile');
      else
        this.breederService.getBreederUsingGET(this.appService.meData.id).subscribe(
          (res) => {
            this.appService.userData = res;
            this.router.navigateByUrl('/breeder-profile');
          }
        )
    } 
  }

  ngOnInit() {
    document.body.style.overflowY = 'scroll';
  }

  ngOnDestroy() {
    document.body.removeAttribute('style');
  }

  loginBreeder(): void {
    
    if (!this.validateFields())
      return;
    this.loginError = false;
    this.isLoading = true;
   
    if (!this.appService.validateEmailInput(this.credentials.username)) {
      this.errorText = 'Пожалуйста, введите действительный E-mail';
      this.loginError = true;
      this.isLoading = false;
    } else {
      let body = new FormData();
      this.credentials.username = this.credentials.username.toLowerCase();
      body.append('username', this.credentials.username);
      body.append('password', this.credentials.password);

      this.http.post('/api/login', body, { responseType: 'text' }).subscribe(
        data => this.onLoginSuccess(),
        error => {
          this.errorText = "Неверный логин или пароль";
          this.loginError = true;
          this.isLoading = false;
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
          //@ts-ignore
          window.intercomSettings.name = res.name;
          //@ts-ignore
          window.intercomSettings.user_id = res.id;
          //@ts-ignore
          window.intercomSettings['breeder_page_url'] = 'https://petman.co/breeder/' + res.id;
          //@ts-ignore
          window.intercomSettings.email = me.email;
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

  fieldEdited(field: string): void {
    this.invalidFields = this.invalidFields.filter(it => it != field);
  }

  private validateFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.credentials.username || this.credentials.username == '') {
      this.invalidFields.push('username');
      isValid = false;
    }

    if (!this.credentials.password || this.credentials.password == '') {
      this.invalidFields.push('password');
      isValid = false;
    }

    return isValid;
  }
}
