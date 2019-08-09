import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-puppies-profile-page',
  templateUrl: './about-puppies-profile-page.component.html',
  styleUrls: ['./about-puppies-profile-page.component.scss']
})
export class AboutPuppiesProfilePageComponent implements OnInit {

  puppiesData: any;

  constructor() { }

  ngOnInit() {
    this.puppiesData = {
      age: null,
      priceFrom: null,
      priceTo: null,
      kitAvail: false,
      medicines: {
        vaccinations: false,
        worms: false,
        chip: false,
        castration: false
      },
      contract: false,
      guaranteePeriod: null,
      problems: null,
      gifts: null
    };
    // @ts-ignore
    $('[data-toggle="tooltip"]').tooltip();
  }

  saveChanges(){
    console.log(this.puppiesData);
  }
}
