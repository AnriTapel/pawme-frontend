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
  // Routes of pages with custom header
  private noGeneralHeaderRoutes = ['/breeder-landing'];
  // Routes of pages with custom footer
  private noGeneralFooterRoutes = [];

  constructor(private theme: LyTheme2, private appService: AppService, public popupService: PopupTemplateService,
    private router: Router) {}

  showGeneralHeader(): boolean{
    return this.noGeneralHeaderRoutes.filter(it => this.router.url.indexOf(it) != -1).length == 0;
  }

  showGeneralFooter(): boolean{
    return this.noGeneralFooterRoutes.filter(it => this.router.url.indexOf(it) != -1).length == 0;
  }

}
