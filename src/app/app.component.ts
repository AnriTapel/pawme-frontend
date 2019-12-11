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
  private noGeneralHeaderRoutes = ['/breeder-landing', '/admin-panel', '/client-page', '/'];
  private noGeneralHeaderPathnames = ['/breeder-landing', '/?'];
  // Routes of pages with custom footer
  private noGeneralFooterRoutes = ['/admin-panel'];
  private noGeneralFooterPathnames = [];

  constructor(private theme: LyTheme2, private appService: AppService, public popupService: PopupTemplateService,
    private router: Router) {}

  showGeneralHeader(): boolean{
    if (this.noGeneralHeaderRoutes.includes(this.router.url))
      return false;
    else
      return this.noGeneralHeaderPathnames.filter(it => this.router.url.indexOf(it) == 0).length == 0 || this.router.url == '/';
  }

  showGeneralFooter(): boolean{
    if (this.noGeneralFooterRoutes.includes(this.router.url))
      return false;
    return this.noGeneralFooterPathnames.filter(it => this.router.url.indexOf(it) != -1).length == 0;
  }

}
