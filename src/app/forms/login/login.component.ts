import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BreederControllerService } from 'src/app/api/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials = { username: '', password: '' };
  loginError: boolean = false;

  constructor(private appService: AppService, private router: Router, private http: HttpClient,
    private breederService: BreederControllerService) {
    if (this.appService.meData.type == "BREEDER")
      this.router.navigateByUrl('/breeder-profile');
  }

  loginBreeder(): void {
    this.loginError = false;
    /*if (!this.appService.validateEmailInput(this.credentials.username))
      this.loginError = true;
    else {*/
      let body = new FormData();
      this.credentials.username = this.credentials.username.toLowerCase();
      body.append('username', this.credentials.username);
      body.append('password', this.credentials.password);

      this.http.post('/api/login', body, { responseType: 'text' }).subscribe(
        data => this.onLoginSuccess(),
        error => this.loginError = true
      );
    //}
  }

  private onLoginSuccess(): void {
    this.breederService.meUsingGET().subscribe(me => {
      this.appService.meData = me;
      if (me.type == 'BREEDER')
        this.breederService.getBreederUsingGET(me.id).subscribe(res => {
          this.appService.userData = res;
          this.router.navigateByUrl('/breeder-profile');
        });
      else
        this.router.navigateByUrl('/breeder-landing');
    });
  }
}
