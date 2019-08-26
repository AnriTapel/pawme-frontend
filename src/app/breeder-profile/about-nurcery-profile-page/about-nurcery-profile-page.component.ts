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
  curProfileImage: string;
  curGallaryPhotos: string[];

  @ViewChild('cityInstance', { static: true }) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', { static: true }) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', { static: true }) addBreedInstance: NgbTypeahead;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(private appService: AppService, private popupService: PopupTemplateService, private eventService: EventService) { }

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
    this.popupService.setPopupParams({width: 200, height: 200, isRect: false});
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadAvatarImage(body).subscribe((imageData) => {
        this.popupService.setShowStatus(false);
        this.nurceryData.nurceryProfileImage = imageData;
        this.curProfileImage = "http://petman.co/img/" + imageData.preview + ".jpg";
      });
      croppedHandler.unsubscribe();
    });
  }

  previewGalleryPhoto(): void {
    this.popupService.setPopupParams({width: 360, height: 360, isRect: true});
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadNurceryGalleryImage(body).subscribe((imageData) => {
        this.popupService.setShowStatus(false);
        this.nurceryData.nurceryGallery.push(imageData);
        this.curGallaryPhotos.push("http://petman.co/img/" + imageData.preview + ".jpg");
      });
      croppedHandler.unsubscribe();
    });
  }

  saveChanges() {
    console.log(this.nurceryData);
  }
}
