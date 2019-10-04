import { Injectable } from '@angular/core';
import { AppService } from '../app-service/app.service';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { EventService } from '../event-service/events.service';

@Injectable({
  providedIn: 'root'
})
export class BreederProfileService {

  profileSubpages: any[] = [
    { tag: 'about-nurcery', name: 'О питомнике' },
    { tag: 'about-puppies', name: 'О щенках' },
    { tag: 'puppies-parents', name: 'Родители щенков' },
    { tag: 'about-me', name: 'О себе' },
    { tag: 'add-puppy', name: 'Добавить щенков' }
  ];

  private curProfilePage: any = this.profileSubpages[0];
  isMobileMenuVisible: boolean = false;

  dataChangesSaved: boolean = true;
  parentTestsChangesSaved: boolean = true;

  constructor(private appService: AppService, private alertService: AlertService, private eventService: EventService) { }

  updateProfileFullness() {
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
  }

  isParentsInfoFilled(): boolean {
    if (!this.appService.userData.parentsInfo)
      return false;
    let male = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "MALE");
    let female = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "FEMALE");
    return male.length > 0 && female.length > 0;
  }

  setCurProfilePage(page: any): void {
    if (!this.dataChangesSaved || !this.parentTestsChangesSaved) {
      let onSuccess = () => {
        this.dataChangesSaved = true;
        this.parentTestsChangesSaved = true;
        this.curProfilePage = page;
        this.isMobileMenuVisible = false;
        scroll(0, 0);
      };

      let onError = () => {
        this.eventService.raiseEvent('save-changes-after-dialog', null);
        this.isMobileMenuVisible = false;
      };

      this.alertService.showDialog("Вы не сохранили изменения", "warning-title",
        ["Все несохраненные изменения будут утеряны. Перейти в другой раздел?"],
        "Перейти без сохранения", "custom-btn btn-transparent", "Сохранить изменения", "custom-btn btn-purple", onSuccess, onError);
    } else {
      this.curProfilePage = page;
      this.isMobileMenuVisible = false;
      scroll(0, 0);
    }
  }

  getCurProfilePage(): any {
    return this.curProfilePage;
  }

  removeUnderlineForBlock(): any {
    let curSubpageIndex = this.profileSubpages.findIndex(it => it.tag == this.curProfilePage.tag);
    return this.profileSubpages[curSubpageIndex + 1] || { tag: null };
  }
}
