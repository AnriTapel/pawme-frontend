import { Component, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements AfterViewInit {

  constructor(private appService: AppService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      let socialBlocks = document.getElementsByClassName('share-buttons');
      for (let k = 0; k < socialBlocks.length; k++) {
        let buttons = socialBlocks[k].children[0].children[1];
        for (let i = 0; i < buttons.childElementCount; i++) {
          buttons.children[i].setAttribute('data-url', 'https://petman.co' + window.location.pathname);
          if (buttons.children[i].getAttribute('data-sharer') == 'vk')
            buttons.children[i].setAttribute('data-image', 'https://petman.co/img/' +
              this.appService.userData.generalInfo.profilePhoto.main + '.jpg');
        }
      }
      window.Sharer.init();
    }, 500)
  }
}
