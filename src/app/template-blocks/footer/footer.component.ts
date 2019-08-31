import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public popupService: PopupTemplateService) { }

  ngOnInit() {
  }

}
