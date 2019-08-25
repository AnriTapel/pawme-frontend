import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app-service/app.service';

@Component({
  selector: 'app-breeder-profile',
  templateUrl: './breeder-profile.component.html',
  styleUrls: ['./breeder-profile.component.scss']
})
export class BreederProfileComponent implements OnInit {

  private curProfilePage: any;
  profileSubpages: any[] = [
    {tag: 'about-nurcery', name: 'О питомнике'},
    {tag: 'about-puppies', name: 'О щенках'},
    {tag: 'puppies-parents', name: 'Родители щенков'},
    {tag: 'about-me', name: 'О себе'},
    {tag: 'add-puppy', name: 'Добавить щенка'}
  ];
  isMobileMenuVisible: boolean = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.setCurProfilePage(this.profileSubpages[0]);
  }

  setCurProfilePage(page: any): void {
    this.curProfilePage = page;
    this.isMobileMenuVisible = false;
  }

  getCurProfilePage(): any {
    return this.curProfilePage;
  }

  showPreview() {

  }

}
