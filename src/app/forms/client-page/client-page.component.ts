import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
 
 breed: string = null;
 index: any ;


  constructor(public appService: AppService, private router: Router, private route: ActivatedRoute) { }
 
  ngOnInit() {}
 
  public getSearchPage() {
    if (this.breed == null) {
      return ;
    }
    const options = {queryParams: {breed: this.breed}};
    this.router.navigate(['/search-page'], options);
  }
  public selectParod(value: string){
    // this.appService.breeds;
    // console.log(value);
    this.index = this.appService.breeds.findIndex(obj => obj.name === value);
    console.log('this.inex.id', this.appService.breeds[this.index].id);
    console.log('this.appService.breeds', this.appService.breeds);
    const options = {queryParams: {breed: this.appService.breeds[this.index].id}};
    this.router.navigate(['/search-page'], options);
  }

}
