import { Injectable } from '@angular/core';
import { AppService } from '../app-service/app.service';
import { AlertService } from 'src/app/services/alert-service/alert.service';

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
  
  constructor(private appService: AppService, private alertService: AlertService) { }

  updateProfileFullness() {
    let index = 1;
    if (this.appService.userData.generalInfo)
      index++;
    if (this.appService.userData.puppiesInfo)
      index++;
    if (this.appService.userData.about)
      index++;
    if (this.appService.userData.parentsInfo)
      index++;
    
    this.appService.userData.profileFill = index;
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

      this.alertService.showDialog(["Все несохраненные изменения будут утеряны. Перейти в другой раздел?"], 
        onSuccess, () => {this.isMobileMenuVisible = false});
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
