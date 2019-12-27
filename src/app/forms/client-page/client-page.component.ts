import { Component, OnInit, Input, AfterViewInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SearchMeta } from '../../model/searchMeta';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';
import { JsonDataService } from '../../services/json-data/json-data.service';




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
    private jsonDataService: JsonDataService

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
      console.log('this.showData', this.showData);
    });


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
          console.log('this.showData', this.showData);
          //this.isShow = true;
        }
      }
    });

  }






  public getSearchPage() {
    if (this.breed == null) {
      return;
    }
    const options = { queryParams: { breed: this.breed } };
    this.router.navigate(['/search-page'], options);
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
