import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me-profile-page',
  templateUrl: './about-me-profile-page.component.html',
  styleUrls: ['./about-me-profile-page.component.scss']
})
export class AboutMeProfilePageComponent implements OnInit {

  breederData: any;
  currentClub: string = null;
  curCertificates: [];
  curPhoto: any;

  constructor() { }

  ngOnInit() {
    this.breederData = {
      aboutMe: null,
      begining: null,
      nurceryFeatures: null,
      photo: null,
      clubs: [],
      certificates: []
    }

  }

  addClub(): void{
    this.breederData.clubs.push(this.currentClub);
    this.currentClub = null;
  }

  deleteClub(index: number): void{
    this.breederData.clubs.splice(index, 1);
  }

  saveChanges(){

  }

}
