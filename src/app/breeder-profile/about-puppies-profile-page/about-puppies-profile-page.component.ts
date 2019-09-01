import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PuppiesInfo, PuppyTest } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';

@Component({
  selector: 'app-about-puppies-profile-page',
  templateUrl: './about-puppies-profile-page.component.html',
  styleUrls: ['./about-puppies-profile-page.component.scss']
})
export class AboutPuppiesProfilePageComponent implements OnInit {

  puppiesData: PuppiesInfo;
  invalidFields: Array<string> = [];

  constructor(public appService: AppService, private breederService: BreederControllerService) { }

  ngOnInit() {
    this.puppiesData = <PuppiesInfo>this.appService.userData.puppiesInfo || {
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
    if (!this.validateInputFields())
      return;

    this.breederService.setPuppiesInfoUsingPUT(this.appService.userData.id, this.puppiesData).subscribe(() => {
      this.appService.userData.puppiesInfo = this.puppiesData;
      scroll(0,0);
    });
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.puppiesData.age) {
      this.invalidFields.push('age');
      isValid = false;
    }

    if (!this.puppiesData.priceFrom || this.puppiesData.priceTo) {
      this.invalidFields.push('price');
      isValid = false;
    }

    if (!this.puppiesData.petmanSet) {
      this.invalidFields.push('set');
      isValid = false;
    }

    if (this.puppiesData.puppyTests.length == 0) {
      this.invalidFields.push('tests');
      isValid = false;
    }

    if (!this.puppiesData.petmanContract) {
      this.invalidFields.push('contract');
      isValid = false;
    }

    if (!this.puppiesData.insuranceTerm) {
      this.invalidFields.push('term');
      isValid = false;
    }

    if (!this.puppiesData.insuranceCoverage || this.puppiesData.insuranceCoverage == "") {
      this.invalidFields.push('coverage');
      isValid = false;
    }
    return isValid;
  }
}
