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
    this.puppiesData = this.appService.userData.puppiesInfo ? <PuppiesInfo>this.appService.userData.puppiesInfo : {
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
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', (forPreview) => this.saveChanges(forPreview));
  }

  ngOnDestroy(): void {
    this.saveChagesEvent.unsubscribe();
  }

  getTooltipPlacement(): string {
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

  saveChanges(forPreview: boolean) {
    if (!this.validateInputFields())
      return;

    this.breederService.setPuppiesInfoUsingPUT(this.appService.userData.id, this.puppiesData).subscribe(
      () => {
        if (!this.appService.userData.puppiesInfo)
          ym(55779592, 'reachGoal', 'PuppySave');
        this.appService.userData.puppiesInfo = this.puppiesData;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        this.profileService.dataChangesSaved = true;
        scroll(0, 0);
        this.profileService.updateProfileFullness();
        if (forPreview)
          window.open('/breeder/' + this.appService.userData.id, '_blank');
      },
      (err) => {
        if (err.status == 423)
          this.notificationService.setContext('К сожалению, ваш аккаунт заблокирован. Help@petman.co', false);
        else
          this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      });
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.puppiesData.age || this.puppiesData.age > 32) {
      this.invalidFields.push('age');
      isValid = false;
    }

    if (this.puppiesData.priceFrom && this.puppiesData.priceTo && this.puppiesData.priceFrom > this.puppiesData.priceTo) {
      this.invalidFields.push('priceFrom');
      this.invalidFields.push('priceTo');
      isValid = false;
    } else {
      if (!this.puppiesData.priceFrom || this.puppiesData.priceFrom > 500000) {
        this.invalidFields.push('priceFrom');
        isValid = false;
      }

      if (!this.puppiesData.priceTo || this.puppiesData.priceTo > 500000) {
        this.invalidFields.push('priceTo');
        isValid = false;
      }
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

    if (this.puppiesData.gifts && this.puppiesData.gifts != "" && this.puppiesData.gifts.length > 512) {
      this.invalidFields.push('gifts');
      isValid = false;
    } else
      this.puppiesData.gifts = null;

    return isValid;
  }
}
