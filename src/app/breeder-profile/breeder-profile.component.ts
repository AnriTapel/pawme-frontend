import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app-service/app.service';
import { BreederProfileService } from '../services/breeder-profile-service/breeder-profile.service';

@Component({
  selector: 'app-breeder-profile',
  templateUrl: './breeder-profile.component.html',
  styleUrls: ['./breeder-profile.component.scss']
})
export class BreederProfileComponent implements OnInit {

  constructor(private appService: AppService, public breederService: BreederProfileService) { }

  ngOnInit() {
    this.breederService.setCurProfilePage(this.breederService.profileSubpages[0]);
  }

  showPreview() {
  }

}
