import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';
import { SearchMeta } from '../../model/searchMeta';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {

  private nonProfileHeaderPathnames = ['/breeder-landing', '/?'];

  breed: string = null;
  state: boolean;
  showMenu;
  breedList;
  getMetaSearchData: SearchMeta = null;//BreederSearchEntry = null;

  constructor(public appService: AppService, public popupService: PopupTemplateService, private http: HttpClient,
    private notificationService: NotificationBarService, private router: Router, private searchControllerService: SearchControllerService, ) { }

  ngOnInit() {
    this.searchControllerService.getSearchMetaUsingGET()
      .subscribe((res) => {
        this.getMetaSearchData = <SearchMeta>res;

        this.breedList = this.appService.breeds;
        this.breedList.forEach((item) => {
          item.disabled = true;
          this.getMetaSearchData['breeds'].forEach(element => {
            if (+item.id === +element) {
              item.disabled = false;
            }
          });
        });

        let replacedBreedList = [];

        this.breedList.forEach((item) => {
          if (!item.disabled) {
            replacedBreedList.push(item);
          }
        });
        this.breedList.forEach((item) => {
          if (item.disabled) {
            replacedBreedList.push(item);
          }
        });

        this.breedList = replacedBreedList;

      }, (err) => {
        if (err.status == 404)
          console.log('error', err);
      });
  }
  public getSearchPage() {
    if (this.breed == null) {
      return;
    }
    const options = { queryParams: { breed: this.breed } };
    this.router.navigate(['/search-page'], options);
  }
  logout(): void {
    this.http.get('/api/logout').subscribe(
      data => {
        this.appService.meData = { type: 'ANONYMOUS' };
        this.appService.userData = null;
        //@ts-ignore
        window.intercomSettings.name = null;
        //@ts-ignore
        window.intercomSettings.user_id = null;
        //@ts-ignore
        window.intercomSettings['breeder_page_url'] = null;
        //@ts-ignore
        window.intercomSettings.email = null;
        this.router.navigateByUrl('/breeder-landing');
      }, error => {
        this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  getScreenSize(event) {

    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 40) {
      this.state = true;
    } else {
      this.state = false;
    }
  }

  isNonProfileHeader(): boolean {
    return this.nonProfileHeaderPathnames.filter(it => this.router.url.indexOf(it) == 0).length != 0 || this.router.url == '/' || this.router.url == '/client-page';
  }

  getMenuType(): MenuType {
    if (this.appService.meData.type == 'ANONYMOUS' || this.appService.meData.type == 'BLOCKED')
      return MenuType.LOGIN;
    if (this.appService.userData && this.appService.userData.id != this.appService.meData.id)
      return MenuType.LOGIN;
    else
      return MenuType.MENU
  }

  openMyPage(): void {
    window.open('/breeder/' + this.appService.meData.id, '_blank');
  }
}

export enum MenuType {
  'LOGIN',
  'MENU'
}
