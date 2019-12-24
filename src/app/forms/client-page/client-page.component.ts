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


  constructor(public appService: AppService, private router: Router, private route: ActivatedRoute) { }
 
  ngOnInit() {}
 
  public getSearchPage() {
    if (this.breed == null) {
      return ;
    }
    const options = {queryParams: {breed: this.breed}};
    this.router.navigate(['/search-page'], options);
  }

}
