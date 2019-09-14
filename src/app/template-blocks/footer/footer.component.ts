import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { AppService } from '../../services/app-service/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getCurRoute(): string{
    return window.location.pathname;
  }


}
