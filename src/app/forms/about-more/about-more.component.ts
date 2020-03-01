import { Component, OnInit, Input } from '@angular/core';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { Intercom } from 'ng-intercom';



@Component({
  selector: 'app-about-more',
  templateUrl: './about-more.component.html',
  styleUrls: ['./about-more.component.scss']
})
export class AboutMoreComponent implements OnInit {
  @Input('params') params; 

  constructor(public popupService: PopupTemplateService, public intercom: Intercom) { }

  ngOnInit() {
  }

  closePopup(){
    this.popupService.setShowStatus(false);
  }

  opneIntercom() {
    console.log('openIntercom')
    // window.Intercom('boot', {
    //   app_id: 'abc12345',
    //   email: 'example@example.com',
    //   user_id: 'abc123',
    //   created_at: 1234567890,
    //   custom_launcher_selector: '#my_custom_link' 
    // });

    this.intercom.boot({
      app_id: 'xauts69y',//<app_id>,
      email: 'example@example.com',
      user_id: 'abc123',
      created_at: 1234567890,
      custom_launcher_selector: '#my_custom_link',
      // Supports all optional configuration.
      // widget: {
      //   "activator": "#intercom" 
      // }
    });
    
   }

}
