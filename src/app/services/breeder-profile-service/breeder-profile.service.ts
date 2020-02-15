import { Injectable, EventEmitter } from '@angular/core';
import { AppService } from '../app-service/app.service';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { EventService } from '../event-service/events.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreederProfileService {

  detectChangeProfileFullness = new EventEmitter;

  profileSubpages: any[] = [
    { tag: 'about-puppies', name: 'Правила продажи' },
    { tag: 'about-nurcery', name: 'О питомнике' },
    { tag: 'puppies-parents', name: 'Наши собаки' },
    { tag: 'about-me', name: 'О себе' },
    { tag: 'add-puppy', name: 'Добавить щенков' }
  ];

  invalidFields: string[] = [];
  private curProfilePage: any = this.profileSubpages[0];
  isMobileMenuVisible: boolean = false;

  dataChangesSaved: boolean = true;

  constructor(private appService: AppService, private alertService: AlertService, private eventService: EventService) { }

  updateProfileFullness() {
    let initialIndex = this.appService.userData.profileFill;
    let index = 1;
    if (this.appService.userData.generalInfo)
      index++;
    if (this.appService.userData.puppiesInfo)
      index++;
    if (this.appService.userData.about)
      index++;
    if (this.appService.userData.parentsInfo && this.isParentsInfoFilled())
      index++;

    this.appService.userData.profileFill = index;
  
    if (initialIndex == 4 && index == 5) {
      //@ts-ignore
      ym(55779592, 'reachGoal', 'CompletedProfile');
      //@ts-ignore
      gtag('event', 'CompletedProfile');
      //@ts-ignore
      fbq('track', 'StartTrial', { value: 1, currency: 'RUB' });
      //@ts-ignore
      Intercom('trackEvent', 'CompletedProfile');
    }

    this.detectChangeProfileFullness.emit(index)
  }

  inputValueChanged(name: string): void {
    this.invalidFields = this.invalidFields.filter(it => it != name);
    this.dataChangesSaved = false;
  }

  isParentsInfoFilled(): boolean {
    if (!this.appService.userData.parentsInfo)
      return false;
    let male = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "MALE");
    let female = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "FEMALE");
    return male.length > 0 || female.length > 0;
  }

  setCurProfilePage(page: any): void {
    if (!this.dataChangesSaved) {
      let onSuccess = () => {
        this.invalidFields = [];
        this.dataChangesSaved = true;
        this.curProfilePage = page;
        this.isMobileMenuVisible = false;
        scroll(0, 0);
      };

      let onError = () => {
        this.eventService.raiseEvent('save-changes-after-dialog', false);
        this.isMobileMenuVisible = false;
      };

      this.alertService.showDialog("Вы не сохранили изменения", "warning-title",
        ["Все несохраненные изменения будут утеряны. Перейти в другой раздел?"],
        "Перейти без сохранения", "custom-btn btn-transparent", "Сохранить изменения", "custom-btn btn-purple", onSuccess, onError);
    } else {
      this.invalidFields = [];
      this.curProfilePage = page;
      this.isMobileMenuVisible = false;
      scroll(0, 0);
    }
  }

  getCurProfilePage(): any {
    return this.curProfilePage;
  }

  showMyPage(): void {
    let onSuccess = () => {
      this.dataChangesSaved = true;
      if (this.appService.userData.generalInfo && this.appService.userData.generalInfo.alias) {
        window.open('/breeder/' + this.appService.userData.generalInfo.alias, '_blank');
      } else {
        window.open('/breeder/' + this.appService.userData.id, '_blank');
      }
    };

    let onError = () => {
      this.eventService.raiseEvent('save-changes-after-dialog', true);
    };

    this.alertService.showDialog("Вы не сохранили изменения", "warning-title",
      ["Все несохраненные изменения будут утеряны. Перейти на вашу страницу?"],
      "Перейти без сохранения", "custom-btn btn-transparent", "Сохранить изменения", "custom-btn btn-purple", onSuccess, onError);
  }

  removeUnderlineForBlock(): any {
    let curSubpageIndex = this.profileSubpages.findIndex(it => it.tag == this.curProfilePage.tag);
    return this.profileSubpages[curSubpageIndex + 1] || { tag: null };
  }
}
