import { Component } from '@angular/core';
import { PopupTemplateService } from './services/popup-service/popup-template.service';
import { LyTheme2, ThemeVariables } from '@alyle/ui';
import { AppService } from './services/app-service/app.service';
import { Router } from '@angular/router';

const STYLES = (theme: ThemeVariables) => ({
  '@global': {
    body: {
      backgroundColor: theme.background.default,
      color: theme.text.default,
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      direction: theme.direction
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly classes = this.theme.addStyleSheet(STYLES);


  constructor(private theme: LyTheme2, private appService: AppService, public popupService: PopupTemplateService, private router: Router) {}

  isHeaderForLanding(): boolean{
    return this.router.url.indexOf('/breeder-landing') != -1;
  }

}
