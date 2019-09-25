import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PuppiesInfo, PuppyTest } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from '../../services/breeder-profile-service/breeder-profile.service';
import { EventService } from 'src/app/services/event-service/events.service';

@Component({
  selector: 'app-about-puppies-profile-page',
  templateUrl: './about-puppies-profile-page.component.html',
  styleUrls: ['./about-puppies-profile-page.component.scss']
})
export class AboutPuppiesProfilePageComponent implements OnInit {

  puppiesData: PuppiesInfo;
  invalidFields: Array<string> = [];
  saveChagesEvent: any;

  constructor(public appService: AppService, private breederService: BreederControllerService, private eventService: EventService,
    private notificationService: NotificationBarService, public profileService: BreederProfileService) { }

  ngOnInit() {
    this.puppiesData = this.appService.userData.puppiesInfo ? <PuppiesInfo>JSON.parse(JSON.stringify(this.appService.userData.puppiesInfo)) : {
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
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', () => this.saveChanges());
  }

  ngOnDestroy(): void{
    this.saveChagesEvent.unsubscribe();
  }

  getTooltipPlacement(): string{
    return window.innerWidth < 770 ? 'bottom-left' : 'bottom';
  }

  puppyTestClicked(test: PuppyTest): void {
    let testIndex = this.puppiesData.puppyTests.map(it => { return it.id }).indexOf(test.id);
    if (testIndex > -1)
      this.puppiesData.puppyTests.splice(testIndex, 1);
    else
      this.puppiesData.puppyTests.push(test);
    this.profileService.dataChangesSaved = false;
  }

  getTestStatus(test: PuppyTest): boolean {
    return this.puppiesData.puppyTests.filter(it => it.id == test.id).length > 0;
  }

  saveChanges() {
    if (!this.validateInputFields())
      return;

    this.breederService.setPuppiesInfoUsingPUT(this.appService.userData.id, this.puppiesData).subscribe(
      () => {
        this.profileService.updateProfileFullness();
        this.appService.userData.puppiesInfo = this.puppiesData;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        this.profileService.dataChangesSaved = true;
        scroll(0, 0);
      },
      () => {
        this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      });
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.puppiesData.age) {
      this.invalidFields.push('age');
      isValid = false;
    }

    if (!this.puppiesData.priceFrom) {
      this.invalidFields.push('priceFrom');
      isValid = false;
    }

    if (!this.puppiesData.priceTo) {
      this.invalidFields.push('priceTo');
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

    return isValid;
  }
}
