import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { PopupTemplateService } from 'src/app/template-blocks/popup-template/popup-template.service';

@Component({
  selector: 'app-about-nurcery-profile-page',
  templateUrl: './about-nurcery-profile-page.component.html',
  styleUrls: ['./about-nurcery-profile-page.component.scss']
})
export class AboutNurceryProfilePageComponent implements OnInit {

  nurceryData: any;
  isAdditionalBreed: boolean = false;

  imagePath: any;
  imageUrl;
  
  @ViewChild('cityInstance', {static: true}) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', {static: true}) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', {static: true}) addBreedInstance: NgbTypeahead;
  @ViewChild('image', {static: true}) image: any;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(private appService: AppService, private popupService: PopupTemplateService) { }

  ngOnInit() {
    this.nurceryData = {
      nurceryName: null,
      nurceryLocation: null,
      nurceryMainBreed: null,
      nurceryAdditionalBreed: null,
      aboutNurcery: null,
      nurceryProfileImage: null,
      nurceryGalleryImage: null,
      nurceryGallery: [],
      nurceryInstagram: null,
      nurcerySite: null,
      nurceryFacebook: null

    };
  }

  preview(files: any): void {
    if (files.length === 0)
      return;
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.popupService.imageUrl = reader.result;
      this.popupService.setCurrentForm('image-cropper');
      this.popupService.setShowStatus(true); 
    }
  }

  saveChanges(){
    console.log(this.nurceryData);
  }
}
