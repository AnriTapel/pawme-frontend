import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private nonProfileHeaderPathnames = ['/breeder-landing', '/?'];

  constructor(
    public appService: AppService,
    public popupService: PopupTemplateService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  isNonProfileHeader(): boolean {
    return this.nonProfileHeaderPathnames.filter(it => this.router.url.indexOf(it) == 0).length != 0 || this.router.url == '/' || this.router.url == '/client-page';
  }

}