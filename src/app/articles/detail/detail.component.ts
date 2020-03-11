import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JsonDataService } from '../../services/json-data/json-data.service';
import { SharedService } from 'src/app/services/shared-services/shared.service';
import { Meta } from '@angular/platform-browser';


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
  img: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private jsonDataService: JsonDataService,
    private sharedService: SharedService,
    private meta: Meta
  ) {
    this.sharedService.headerType.emit('2')
  }
  ngOnDestroy(): void {
    this.sharedService.headerType.emit('1')
  }
  ngAfterViewInit() {
    setTimeout(() => {
      let socialBlocks = document.getElementsByClassName('share-buttons');
      for (let k = 0; k < socialBlocks.length; k++) {
        let buttons = socialBlocks[k].children[0].children[1];
        for (let i = 0; i < buttons.childElementCount; i++)
          buttons.children[i].setAttribute('data-url', window.location.href);
      }
      window.Sharer.init();
    }, 500)
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
      this.img = this.showData.img.split(".");
      this.meta.addTags([
        { property: 'og:type', content: 'website' },
        { name: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.origin + "/article/" + this.id},
        { name: 'og:url', content: window.location.origin + "/article/" + this.id},
        { property: 'title', content: this.showData.title1},
        { name: 'title', content: this.showData.title1},
        { property: 'og:title', content: this.showData.title1},
        { name: 'og:title', content: this.showData.title1 },
        { name: 'twitter:title', content: this.showData.title1},
        { property: 'og:description', content: this.showData.subTitle },
        { name: 'og:description', content: this.showData.subTitle },
        { name: 'twitter:description', content: this.showData.subTitle },
        { property: 'og:site_name', content: 'Petman' },
        { name: 'og:site_name', content: 'Petman' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { property: 'og:image', content: window.location.origin + this.img[1] + '.jpg'},
        { name: 'og:image', content: window.location.origin + this.img[1] + '.jpg'},
        { name: 'twitter:image', content: window.location.origin + this.img[1] + '.jpg'}
    ]);
    });

  }
  opneIntercom() {
    //@ts-ignore
    Intercom('show');
   }
   opneArtical() {
     
   }
  
}
