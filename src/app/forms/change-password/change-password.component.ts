import { Component, OnInit } from '@angular/core';
import { BreederControllerService } from '../..';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  uuid: string = null;
  newPasswrod = null;
  repeatPassword = null;
  isError: boolean = false;

  constructor(private breederService: BreederControllerService, private route: ActivatedRoute) {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
  }

  ngOnInit() {
  }

  changePassword(): void{
    if (this.newPasswrod !== this.repeatPassword){
      this.isError = true;
      return;
    }

    this.breederService.changePasswordUsingPOST(this.newPasswrod, this.uuid).subscribe(
      (res) => console.log("Success: " + res),
      (error) => console.log("Error: " + error)
    );

  }

}
