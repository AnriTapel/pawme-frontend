import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { EventService } from 'src/app/services/event-service/events.service';

@Component({
  selector: 'app-about-nurcery-profile-page',
  templateUrl: './about-nurcery-profile-page.component.html',
  styleUrls: ['./about-nurcery-profile-page.component.scss']
})
export class AboutNurceryProfilePageComponent implements OnInit {

  nurceryData: any;
  isAdditionalBreed: boolean = false;
  curGalleryPhotos: string[] = [];

  @ViewChild('cityInstance', { static: true }) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', { static: true }) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', { static: true }) addBreedInstance: NgbTypeahead;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(public appService: AppService, private popupService: PopupTemplateService, private eventService: EventService) { }

  ngOnInit() {
    this.nurceryData = {
      nurceryName: null,
      nurceryLocation: null,
      nurceryMainBreed: null,
      nurceryAdditionalBreed: null,
      aboutNurcery: null,
      nurceryProfileImage: null,
      nurceryGallery: [],
      nurceryInstagram: null,
      nurcerySite: null,
      nurceryFacebook: null
    };
  }

  previewNurceryPhoto(): void {
    this.popupService.setPopupParams({
      width: 200, height: 200, isRect: false,
      imageUrl: this.nurceryData.nurceryProfileImage ? "/img/" + this.nurceryData.nurceryProfileImage.main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadAvatarImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.nurceryData.nurceryProfileImage = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  previewGalleryPhoto(index: number): void {
    this.popupService.setPopupParams({
      width: 360, height: 360, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.nurceryData.nurceryGallery[index].main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadNurceryGalleryImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        if (index == -1) 
          this.nurceryData.nurceryGallery.push(imageData);
        else
          this.nurceryData.nurceryGallery[index] = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  deleteGalleryImage(index: number): void {
    this.curGalleryPhotos.splice(index, 1);
    this.nurceryData.nurceryGallery.splice(index, 1);
  }

  saveChanges() {
    console.log(this.nurceryData);
  }
}
