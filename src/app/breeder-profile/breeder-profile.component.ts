import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breeder-profile',
  templateUrl: './breeder-profile.component.html',
  styleUrls: ['./breeder-profile.component.scss']
})
export class BreederProfileComponent implements OnInit {

  private curProfilePage: string;
  pageNamesByOrder: string[] = ['about-nurcery', 'about-puppies', 'puppies-parents', 'about-me', 'add-puppy'];

  constructor() { }

  ngOnInit() {
    this.setCurProfilePage("about-nurcery");
  }

  setCurProfilePage(page: string): void{
    this.curProfilePage = page;
  }

  getCurProfilePage(): string{
    return this.curProfilePage;
  }

  showPreview(){
    
  }

}
