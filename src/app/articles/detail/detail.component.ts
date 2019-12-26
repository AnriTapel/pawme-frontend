import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { HttpClient } from '@angular/common/http'; 
import { JsonDataService } from '../../services/json-data/json-data.service';

// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  articalsData: any; 
  id: any;
  jsonId: any;
  showData: any;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private jsonDataService : JsonDataService ) { 
 
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id);
    });
   this.jsonDataService.getJSON().subscribe(data => {
     this.articalsData = data.articales; 
     console.log('length', this.articalsData);
     for (let i=0; i < this.articalsData.length; i++) {
      if (this.articalsData[i].id === this.id) {
        //console.log('aaaaaaaa');
        //console.log('aaaaaa', this.articalsData[i]);
          this.showData = this.articalsData[i];
      }
    }
      //this.showData = this.search(this.id, this.articalsData);
    // console.log('this.showData', this.showData.title1);
    });
    
    
    //this.showData = this.search(this.id, this.articalsData);
  
 
  }
  

  public search(nameKey, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}
  

}
