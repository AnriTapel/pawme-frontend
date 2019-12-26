import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { SearchMeta } from '../../model/searchMeta';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';




@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
 
 breed: string = null;
 index: any ;
 getMetaSearchData: SearchMeta = null;//BreederSearchEntry = null;
 breedList;



  constructor(
    public appService: AppService, 
    private router: Router, 
    private route: ActivatedRoute,
    private searchControllerService: SearchControllerService,
    ) { }
 
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

    }, (err) => {
      if (err.status == 404)
        console.log('error', err);
    });
  }
 
  public getSearchPage() {
    if (this.breed == null) {
      return ;
    }
    const options = {queryParams: {breed: this.breed}};
    this.router.navigate(['/search-page'], options);
  }
  public selectParod(value: string) {
    this.index = this.appService.breeds.findIndex(obj => obj.name === value);
    const options = {queryParams: {breed: this.appService.breeds[this.index].id}};
    this.router.navigate(['/search-page'], options);
  }
  public openArtical() {
    this.router.navigate(['/articles']);
  }

}
