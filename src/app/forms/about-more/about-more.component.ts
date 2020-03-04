import { Component, OnInit, Input } from '@angular/core';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';



@Component({
  selector: 'app-about-more',
  templateUrl: './about-more.component.html',
  styleUrls: ['./about-more.component.scss']
})
export class AboutMoreComponent implements OnInit {
  @Input('params') params; 

  constructor(public popupService: PopupTemplateService) { }

  ngOnInit() {
    this.popupService.setPopupParams("width: '400px'");
    //this.popupService.setPopupParams("width: 400px");
    this.popupService.getPopupParams().width;
  }

  closePopup(){
    this.popupService.setShowStatus(false);
  }

  opneIntercom() {
    //@ts-ignore
    Intercom('show');
   }

}
