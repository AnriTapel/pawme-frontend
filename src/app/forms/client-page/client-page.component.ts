import { Component, OnInit, Input, AfterViewInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SearchMeta } from '../../model/searchMeta';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';
import { JsonDataService } from '../../services/json-data/json-data.service';
import { Meta } from '@angular/platform-browser';




@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  breed: string = null;
  index: any;
  getMetaSearchData: SearchMeta = null;//BreederSearchEntry = null;
  breedList;
  clientData: any;
  showData: any;
  isShow: boolean = false;
  id: any;

  state: boolean;

  showMenu;

  constructor(
    public appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private searchControllerService: SearchControllerService,
    private jsonDataService: JsonDataService,
    private meta: Meta

  ) { }

  @HostListener('window:scroll', ['$event'])
  getScreenSize(event) {

    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 520) {
      this.state = true;
    } else {
      this.state = false;
    }
  }
  
  ngOnInit() {

    this.jsonDataService.getClientJSON().subscribe(data => {
      this.clientData = data.clients;
      this.showData = this.clientData[0];
      this.id = '1';
    });

    this.meta.addTags([
      { property: 'og:type', content: 'website' },
      { name: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://petman.co/client-page'},
      { name: 'og:url', content: 'https://petman.co/client-page'},
      { property: 'title', content: 'Petman - найди себе верного друга'},
      { name: 'title', content: 'Petman - найди себе верного друга'},
      { property: 'og:title', content: 'Petman - найди себе верного друга'},
      { name: 'og:title', content: 'Petman - найди себе верного друга' },
      { name: 'twitter:title', content: 'Petman - найди себе верного друга'},
      { property: 'og:description', content: 'Мы помогаем будущим хозяевам собак и заводчикам находить друг друга. Подробная информация о каждом питомнике с фотографиями, щенки с обязательным комплектом документов и договором. Удобный поиск по городам и породам.'},
      { name: 'og:description', content: 'Мы помогаем будущим хозяевам собак и заводчикам находить друг друга. Подробная информация о каждом питомнике с фотографиями, щенки с обязательным комплектом документов и договором. Удобный поиск по городам и породам.'},
      { name: 'twitter:description', content: 'Мы помогаем будущим хозяевам собак и заводчикам находить друг друга. Подробная информация о каждом питомнике с фотографиями, щенки с обязательным комплектом документов и договором. Удобный поиск по городам и породам.'},
      { property: 'og:site_name', content: 'Petman' },
      { name: 'og:site_name', content: 'Petman' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:image', content: 'https://petman.co/assets/img/client-page/header-mobile.jpg'},
      { name: 'og:image', content: 'https://petman.co/assets/img/client-page/header-mobile.jpg'},
      { name: 'twitter:image', content: 'https://petman.co/assets/img/client-page/header-mobile.jpg'}
  ]);


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


  public showClinet(id) {
    console.log("value", id);
    this.id = id;
    this.jsonDataService.getClientJSON().subscribe(data => {
      this.clientData = data.clients;
      console.log("this.clientData", this.clientData);
      for (let i = 0; i < this.clientData.length; i++) {
        if (this.clientData[i].id === id) {
          this.showData = this.clientData[i];
        }
      }
    });

  }

  public getSearchPage() {
     //@ts-ignore
     ym(55779592, 'reachGoal', 'FindLanding');
     //@ts-ignore
     gtag('event', 'FindLanding');
    //@ts-ignore
    Intercom('trackEvent', 'ParentsSave');
    if (this.breed == null) {
      return;
    }
    const options = { queryParams: { breed: this.breed } };
    this.router.navigate(['/search-page'], options);
  }

  public yandexInfo() {
    //@ts-ignore
    ym(55779592, 'reachGoal', 'LookTopLanding');
    //@ts-ignore
    gtag('event', 'LookTopLanding');
    //@ts-ignore
    Intercom('trackEvent', 'LookTopLanding');
  }
  public readyForDog() {
    //@ts-ignore
    ym(55779592, 'reachGoal', 'ReadyForDog');
    //@ts-ignore
    gtag('event', 'ReadyForDog');
    //@ts-ignore
    Intercom('trackEvent', 'ReadyForDog');
  }
  public howToChoose() {
    //@ts-ignore
    ym(55779592, 'reachGoal', 'HowToChoose');
    //@ts-ignore
    gtag('event', 'HowToChoose');
    //@ts-ignore
    Intercom('trackEvent', 'HowToChoose');
  }
  public howToPrepare() {
    //@ts-ignore
    ym(55779592, 'reachGoal', 'HowToPrepare');
    //@ts-ignore
    gtag('event', 'HowToPrepare');
    //@ts-ignore
    Intercom('trackEvent', 'HowToPrepare');
  }
  public selectParod(value: string) {
    this.index = this.appService.breeds.findIndex(obj => obj.name === value);
    const options = { queryParams: { breed: this.appService.breeds[this.index].id } };
    this.router.navigate(['/search-page'], options);
  }
  public openArtical() {
    this.router.navigate(['/articles']);
  }
  public renderBrender() {
    this.router.navigate(['/breeder-landing']);
  }

}
