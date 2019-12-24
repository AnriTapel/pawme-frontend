import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SearchTerms } from '../../model/searchTerms';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  // searchDataFromClientPage: SearchTerms = {
  //   breed: null,
  //   cities: null
  // }
  searchDataFromClientPage: SearchTerms = {
    breed: null,
    cities: null
  }
 breed: string = null;

  // @Input() searchDataFromClientPage: SearchTerms;
  constructor(public appService: AppService, private router: Router, private route: ActivatedRoute) { }
  // ngAfterViewInit(): void {

  // };
  ngOnInit() {}
 
  public getSearchPage() {
    // if (this.searchDataFromClientPage.breed == null) {
    //   return ;
    // }
    if (this.breed == null) {
      return ;
    }
    console.log('cliet page------searchDataFromClientPage', this.breed);
    // this.route.queryParamMap.subscribe(params => this.breed = params.get('breed'));
    const options = {queryParams: {breed: this.breed}};
    this.router.navigate(['/search-page'], options);
    //this.router.navigateByUrl('/search-page');
  }

}
