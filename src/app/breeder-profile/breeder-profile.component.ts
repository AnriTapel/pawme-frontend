import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app-service/app.service';
import { BreederProfileService } from '../services/breeder-profile-service/breeder-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breeder-profile',
  templateUrl: './breeder-profile.component.html',
  styleUrls: ['./breeder-profile.component.scss']
})
export class BreederProfileComponent implements OnInit {

  constructor(public appService: AppService, public profileService: BreederProfileService, private router: Router) {
    if (this.appService.meData.type != 'BREEDER')
      router.navigateByUrl('/login');
    this.profileService.updateProfileFullness();
  }

  ngOnInit() {
  }

  showPreview() {
    this.router.navigateByUrl('/preview/' + this.appService.userData.id);
  }

}
