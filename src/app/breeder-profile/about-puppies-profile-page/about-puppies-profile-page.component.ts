import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PuppiesInfo, PuppyTest } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from '../../services/breeder-profile-service/breeder-profile.service';
import { EventService } from 'src/app/services/event-service/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-puppies-profile-page',
  templateUrl: './about-puppies-profile-page.component.html',
  styleUrls: ['./about-puppies-profile-page.component.scss']
})
export class AboutPuppiesProfilePageComponent implements OnInit {

  puppiesData: PuppiesInfo;
  saveChagesEvent: any;
  isLoading: boolean = false;
  errors;
  isFocused = {};
  customeValidator;
  progress: any;

  constructor(public appService: AppService, private breederService: BreederControllerService, private eventService: EventService,
    private notificationService: NotificationBarService, public profileService: BreederProfileService, private router: Router) { }
  updateLocalData() {
    let obj: any = this.puppiesData
    localStorage.setItem('IVAboutPuppies', JSON.stringify(obj));
    this.validateInputFields();
  }

  focusCheck(elem) {
    this.isFocused[elem] = true;
  }

  ngOnInit() {
    let intervediateData = JSON.parse(localStorage.getItem('IVAboutPuppies'));


    if (this.appService.userData.puppiesInfo) {
      this.puppiesData = <PuppiesInfo>this.appService.userData.puppiesInfo;
    } else {
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
      if (intervediateData) {
        for (const key in intervediateData) {
          if (intervediateData[key]) {
            this.puppiesData[key] = intervediateData[key];
          }
        }
      }
    }

    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', (forPreview) => this.saveChanges(forPreview));
  }

  ngOnDestroy(): void {
    this.saveChagesEvent.unsubscribe();
  }

  getTooltipPlacement(): string {
    return window.innerWidth < 770 ? 'bottom-left' : 'bottom';
  }

  puppyTestClicked(test: PuppyTest): void {
    this.profileService.inputValueChanged('tests');
    let testIndex = this.puppiesData.puppyTests.map(it => { return it.id }).indexOf(test.id);
    if (testIndex > -1)
      this.puppiesData.puppyTests.splice(testIndex, 1);
    else
      this.puppiesData.puppyTests.push(test);
    this.profileService.dataChangesSaved = false;
    this.updateLocalData();
  }

  getTestStatus(test: PuppyTest): boolean {
    return this.puppiesData.puppyTests.filter(it => it.id == test.id).length > 0;
  }

  saveChanges(forPreview: boolean) {
    if (!this.validateInputFields()) {
      this.customeValidator = true;
      this.scrollToError();
      return;
    }
    this.customeValidator = false;

    this.isLoading = true;
    this.breederService.setPuppiesInfoUsingPUT(this.appService.userData.id, this.puppiesData).subscribe(
      () => {
        if (!this.appService.userData.puppiesInfo) {
          //@ts-ignore
          ym(55779592, 'reachGoal', 'PuppySave');
          //@ts-ignore
          gtag('event', 'PuppySave');
          //@ts-ignore
          Intercom('trackEvent', 'PuppySave');
        }
        this.appService.userData.puppiesInfo = this.puppiesData;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        this.profileService.dataChangesSaved = true;
        this.isLoading = false;
        scroll(0, 0);
        this.profileService.updateProfileFullness();
        this.progress = this.appService.userData.profileFill;
        if (this.progress == 5) {
          this.notificationService.setContext('Поздравляем! Вас теперь видят покупатели!', true);
          this.notificationService.setVisibility(true);
        }
        if (forPreview) {
          if (this.appService.userData.generalInfo.alias) {
            window.open('/breeder/' + this.appService.userData.generalInfo.alias, '_blank');
          } else {
            window.open('/breeder/' + this.appService.userData.id, '_blank');
          } 
        }
      },
      (err) => {
        if (err.status == 423)
          this.notificationService.setContext('К сожалению, ваш аккаунт заблокирован. Help@petman.co', false);
        else if (err.status == 403)
          this.router.navigateByUrl('/login');
        else
          this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      });
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.profileService.invalidFields = [];

    if (!this.puppiesData.age || this.puppiesData.age > 50 || this.puppiesData.age < 1) {
      this.profileService.invalidFields.push('age');
      isValid = false;
    }

    if (this.puppiesData.priceFrom && this.puppiesData.priceTo && this.puppiesData.priceFrom > this.puppiesData.priceTo) {
      this.profileService.invalidFields.push('priceFrom');
      this.profileService.invalidFields.push('priceTo');
      isValid = false;
    } else {
      if (!this.puppiesData.priceFrom || this.puppiesData.priceFrom > 500000 || this.puppiesData.priceFrom < 1) {
        this.profileService.invalidFields.push('priceFrom');
        isValid = false;
      }

      if (!this.puppiesData.priceTo || this.puppiesData.priceTo > 500000 || this.puppiesData.priceTo < 1) {
        this.profileService.invalidFields.push('priceTo');
        isValid = false;
      }
    }

    if (!this.puppiesData.petmanSet) {
      this.profileService.invalidFields.push('set');
      isValid = false;
    }

    if (this.puppiesData.puppyTests.length == 0) {
      this.profileService.invalidFields.push('tests');
      isValid = false;
    }

    if (!this.puppiesData.petmanContract) {
      this.profileService.invalidFields.push('contract');
      isValid = false;
    }

    if (this.puppiesData.gifts && this.puppiesData.gifts != "" && this.puppiesData.gifts.length > 512) {
      this.profileService.invalidFields.push('gifts');
      isValid = false;
    } else if (this.puppiesData.gifts == "") {
      this.puppiesData.gifts = null;
    }

    this.errors = this.profileService.invalidFields;

    return isValid;
  }

  scrollToError() {
    setTimeout(() => {
      if (document.getElementsByClassName('invalid-form-field-value').length)
        document.getElementsByClassName('invalid-form-field-value')[0].scrollIntoView({ block: "center", behavior: "smooth" })
    }, 50);
  }
}
