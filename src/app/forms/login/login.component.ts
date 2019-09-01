import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
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
    private breederService: BreederControllerService) { }

  loginBreeder(): void {
    this.loginError = false;
    if (!this.appService.validateEmailInput(this.credentials.username))
      this.loginError = true;
    else {
      let body = new FormData();
      body.append('username', this.credentials.username);
      body.append('password', this.credentials.password);

      /*this.http.post('/api/login', body, { responseType: 'text' }).pipe(
        tap(
          data => this.breederService.getBreederUsingGET(JSON.parse(data).id).subscribe(res => {
            this.appService.userData = res;
            this.router.navigateByUrl('/breeder-profile');
          }), error => this.loginError = true
        )
      );*/

      this.http.post('/api/login', body, { responseType: 'text' }).subscribe(
          data => this.breederService.getBreederUsingGET(JSON.parse(data).id).subscribe(res => {
            this.appService.userData = res;
            this.router.navigateByUrl('/breeder-profile');
          }), error => this.loginError = true
        );
    }
  }

}
