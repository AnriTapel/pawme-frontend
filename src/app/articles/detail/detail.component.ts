import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonDataService } from '../../services/json-data/json-data.service';
import { SharedService } from 'src/app/services/shared-services/shared.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  articalsData: any;
  id: any;
  jsonId: any;
  showData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private jsonDataService: JsonDataService,
    private sharedService: SharedService
  ) {
    this.sharedService.headerType.emit('2')
  }
  ngOnDestroy(): void {
    this.sharedService.headerType.emit('1')
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
    this.jsonDataService.getJSON().subscribe(data => {
      this.articalsData = data.articales;
      for (let i = 0; i < this.articalsData.length; i++) {
        if (this.articalsData[i].id === this.id) {
          this.showData = this.articalsData[i];
        }
      }
    });

  }


}
