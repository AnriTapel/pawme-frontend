import { Injectable } from '@angular/core';
import { AppService } from '../app-service/app.service';

@Injectable({
  providedIn: 'root'
})
export class BreederProfileService {
  
  private curProfilePage: any;
  isMobileMenuVisible: boolean = false;
  profileSubpages: any[] = [
    {tag: 'about-nurcery', name: 'О питомнике'},
    {tag: 'about-puppies', name: 'О щенках'},
    {tag: 'puppies-parents', name: 'Родители щенков'},
    {tag: 'about-me', name: 'О себе'},
    {tag: 'add-puppy', name: 'Добавить щенков'}
  ];

  constructor(private appService: AppService) { }

  setCurProfilePage(page: any): void {
    this.curProfilePage = page;
    this.isMobileMenuVisible = false;
    scroll(0,0);
  }

  getCurProfilePage(): any {
    return this.curProfilePage;
  }

  removeUnderlineForBlock(): any{
    let curSubpageIndex = this.profileSubpages.findIndex(it => it.tag == this.curProfilePage.tag);
    return this.profileSubpages[curSubpageIndex + 1];
  }
}
