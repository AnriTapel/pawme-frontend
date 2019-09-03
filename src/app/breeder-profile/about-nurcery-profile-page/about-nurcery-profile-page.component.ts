import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { EventService } from 'src/app/services/event-service/events.service';
import { BreederInfo } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';

@Component({
  selector: 'app-about-nurcery-profile-page',
  templateUrl: './about-nurcery-profile-page.component.html',
  styleUrls: ['./about-nurcery-profile-page.component.scss']
})
export class AboutNurceryProfilePageComponent implements OnInit {

  nurceryData: BreederInfo;

  curMainBreed: string;
  curExtraBreed: string;
  curCity: string;
  isAdditionalBreed: boolean = false;
  invalidFields: string[] = [];

  @ViewChild('cityInstance', { static: true }) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', { static: true }) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', { static: true }) addBreedInstance: NgbTypeahead;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(public appService: AppService, private popupService: PopupTemplateService,
    private eventService: EventService, private breederService: BreederControllerService) { }

  ngOnInit() {
    this.nurceryData = <BreederInfo>this.appService.userData.generalInfo || {
      name: null,
      city: null,
      mainBreed: null,
      extraBreed: null,
      description: null,
      profilePhoto: null,
      gallery: [],
      instagram: null,
      site: null,
      facebook: null
    };
    this.curMainBreed = this.nurceryData.mainBreed ? this.nurceryData.mainBreed.name : null;
    this.curMainBreed = this.nurceryData.extraBreed ? this.nurceryData.extraBreed.name : null;
    this.curCity = this.nurceryData.city ? this.nurceryData.city.name : null;
  }

  previewNurceryPhoto(): void {
    this.popupService.setPopupParams({
      width: 200, height: 200, isRect: false,
      imageUrl: this.nurceryData.profilePhoto ? "/img/" + this.nurceryData.profilePhoto.main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadAvatarImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.nurceryData.profilePhoto = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  previewGalleryPhoto(index: number): void {
    this.popupService.setPopupParams({
      width: 360, height: 360, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.nurceryData.gallery[index].main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadNurceryGalleryImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        if (index == -1) 
          this.nurceryData.gallery.push(imageData);
        else
          this.nurceryData.gallery[index] = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  deleteGalleryImage(index: number): void {
    this.nurceryData.gallery.splice(index, 1);
  }

  saveChanges() {
    if (!this.validateInputFields())
      return;

    this.nurceryData.city = this.appService.cities.filter(it => it.name == this.curCity)[0] || {name: this.curCity};
    this.nurceryData.mainBreed = this.appService.breeds.filter(it => it.name == this.curMainBreed)[0] || {name: this.curMainBreed};
    if (!this.nurceryData.name)
      this.nurceryData.name = this.appService.userData.name + " " + this.appService.userData.surname;
    if (this.curExtraBreed)
      this.nurceryData.extraBreed = this.appService.breeds.filter(it => it.name == this.curExtraBreed)[0] || {name: this.curExtraBreed};
    this.breederService.setGeneralInfoUsingPUT(this.nurceryData, this.appService.userData.id)
      .subscribe(() => {
        if (!this.appService.userData.generalInfo)
          this.appService.userData.profileFill++;
        this.appService.userData.generalInfo = this.nurceryData;
        scroll(0, 0);
      })
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.curMainBreed || this.curMainBreed == "") {
      this.invalidFields.push('mainBreed');
      isValid = false;
    }

    if (!this.curCity || this.curCity == "") {
      this.invalidFields.push('city');
      isValid = false;
    }

    if (!this.nurceryData.description) {
      this.invalidFields.push('desc');
      isValid = false;
    }

    if (!this.nurceryData.profilePhoto) {
      this.invalidFields.push('profilePhoto');
      isValid = false;
    }

    if (this.nurceryData.gallery.length == 0) {
      this.invalidFields.push('gallery');
      isValid = false;
    }
    return isValid;
  }
}
