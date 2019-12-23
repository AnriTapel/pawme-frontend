import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
//import { BreederProfileService } from 'src/app/services/breeder-profile-service/breeder-profile.service'; 
import { SearchControllerService } from 'src/app/api/api';
import { SearchTerms } from '../../model/searchTerms';
import { SearchMeta } from '../../model/searchMeta';
import { BreederSearchEntry } from '../../model/breederSearchEntry';
// import { RegisterBreeder } from '../model/registerBreeder';








@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(public appService: AppService, private searchControllerService: SearchControllerService) { }

  searchData: SearchTerms = {
    breed: null,
    cities: null
  }

  SearchMetaData: SearchMeta = {
    breeds: null,
    cities: null
  }

  getSearchData: any = null; 
  getMetaSearchData: SearchMeta = null;//BreederSearchEntry = null;
  //getMetaSearchData: SearchMeta = null;
  lenghtSearchData: number;
  showTableData: boolean = false;
  p: any;
  userFilter: any ;
  dataFilter: any ;


  ngOnInit() {
    // var newText = document.getElementsByClassName('ng-clear');
    //   console.log(newText[0]);
   // newText.innerHTML = 'new text here';

  // }
  this.searchControllerService.getSearchMetaUsingGET()
  .subscribe((res) => {
      this.getMetaSearchData = <SearchMeta>res;
      console.log('this.getMetaSearchData', this.getMetaSearchData);
  }, (err) => {
      if (err.status == 404)
      console.log('error', err);
  });
   this.searchControllerService.findUsingPOST(this.searchData)
            .subscribe((res) => {
              this.lenghtSearchData = res.length;
                this.getSearchData = <any>res;
            }, (err) => {
                if (err.status == 404)
                console.log('error', err) 
            });       
  }
  public changeInput(event) {
    console.log('this.searchData', this.searchData);
     this.searchControllerService.findUsingPOST(this.searchData)
            .subscribe((res) => {
                this.lenghtSearchData = res.length;
                this.getSearchData = <any>res;
               // this.getSearchData = <BreederSearchEntry>res;
                //console.log('this.getSearchData', this.getSearchData);
            }, (err) => {
                if (err.status == 404)
                console.log('error', err)
                    //this.router.navigateByUrl('/404');
            });
  }
  public updateSearch($event) {
    console.log('$event.target.value', $event);
    if ($event == '') {
      this.showTableData = false;
    } else {
      this.showTableData = true;
    }

 
    // this.searchControllerService.getSearchMetaUsingGET()
    // .subscribe((res) => {
    //     this.getMetaSearchData = <SearchMeta>res;
    //     console.log('this.getMetaSearchData', this.getMetaSearchData);
    // }, (err) => {
    //     if (err.status == 404)
    //     console.log('error', err)
    //         //this.router.navigateByUrl('/404');
    // });
  } 

}
