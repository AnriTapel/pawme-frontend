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
    if (appService.meData.type == 'ANONYMOUS') {
      router.navigateByUrl('/login');
      return;
    } else if (appService.meData.type == 'BREEDER' && appService.userData.status == 'UNCONFIRMED') {
      router.navigateByUrl('/confirm-email/unconfirmed');
      return;
    }
     
    this.profileService.updateProfileFullness();
    if (this.appService.userData.profileFill < 2)
      this.appService.isOnboardingVisible = true;
  }

  ngOnInit() {
  }

  showMyPage(): void {
    if (this.profileService.dataChangesSaved)
      window.open('/breeder/' + this.appService.userData.id, '_blank')
    else
      this.profileService.showMyPage();
  }
  openExample(): void{
    window.open('https://petman.co/breeder/8258', '_blank');
  }
  /*showPreview() {
    this.router.navigateByUrl('/preview/' + this.appService.userData.id);
  }*/

}
