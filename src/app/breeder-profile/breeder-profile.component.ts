import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-breeder-profile',
  templateUrl: './breeder-profile.component.html',
  styleUrls: ['./breeder-profile.component.scss']
})
export class BreederProfileComponent implements OnInit {

  private curProfilePage: string;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.setCurProfilePage("about-nurcery");
  }

  setCurProfilePage(page: string): void {
    this.curProfilePage = page;
  }

  getCurProfilePage(): string {
    return this.curProfilePage;
  }

  showPreview() {

  }

}
