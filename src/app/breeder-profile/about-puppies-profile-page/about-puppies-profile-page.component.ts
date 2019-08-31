import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PuppiesInfo, PuppyTest } from 'src/app/model/models';

@Component({
  selector: 'app-about-puppies-profile-page',
  templateUrl: './about-puppies-profile-page.component.html',
  styleUrls: ['./about-puppies-profile-page.component.scss']
})
export class AboutPuppiesProfilePageComponent implements OnInit {

  puppiesData: PuppiesInfo;

  constructor(protected appService: AppService) { }

  ngOnInit() {
    this.puppiesData = {
      age: null,
      priceFrom: null,
      priceTo: null,
      petmanSet: false,
      puppyTests: [],
      petmanContract: false,
      insuranceTerm: null,
      insuranceCoverage: null,
      gifts: null
    };
    // @ts-ignore
    $('[data-toggle="tooltip"]').tooltip();
  }

  puppyTestClicked(test: PuppyTest): void{
    let testIndex = this.puppiesData.puppyTests.map(it => {return it.id}).indexOf(test.id);
    if (testIndex > -1)
      this.puppiesData.puppyTests.splice(testIndex, 1);
    else
      this.puppiesData.puppyTests.push(test);
  }

  getTestStatus(test: PuppyTest): boolean{
    return this.puppiesData.puppyTests.filter(it => it.id == test.id).length > 0;
  }

  saveChanges(){
    console.log(this.puppiesData);
  }
}
