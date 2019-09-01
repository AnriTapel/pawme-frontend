import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from 'src/app/services/event-service/events.service';
import { BreederAbout } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';

@Component({
  selector: 'app-about-me-profile-page',
  templateUrl: './about-me-profile-page.component.html',
  styleUrls: ['./about-me-profile-page.component.scss']
})
export class AboutMeProfilePageComponent implements OnInit {

  breederData: BreederAbout;
  currentClub: string = null;

  invalidFields: Array<string> = [];

  constructor(private popupService: PopupTemplateService, private appService: AppService, private eventService: EventService,
      private breederService: BreederControllerService) { }

  ngOnInit() {
    this.breederData = <BreederAbout>this.appService.userData.about || {
      about: null,
      howItStarted: null,
      outstandingInfo: null,
      photo: null,
      clubs: [],
      certificates: []
    }
  }

  previewPersonalImage() {
    this.popupService.setPopupParams({
      width: 270, height: 200, isRect: true,
      imageUrl: this.breederData.photo ? "/img/" + this.breederData.photo.main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPersonalImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.breederData.photo = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  deletePersonalImage(): void {
    this.breederData.photo = null;
  }

  uploadCertificates(event: any): void {
    for (let file of event.target.files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let img = new Image();
        img.onload = () => {
          let body = new FormData();
          body.append('image', file, file.name);
          body.append('rect', '0,0,' + img.width + ',' + img.height);
          this.appService.uploadPersonalImage(body).subscribe((imageData: any) => {
            this.breederData.certificates.push(imageData);
          });
        }
        img.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  deleteCertificate(index: number): void {
    this.breederData.certificates.splice(index, 1);
  }

  addClub(): void {
    this.breederData.clubs.push(this.currentClub);
    this.currentClub = null;
  }

  deleteClub(index: number): void {
    this.breederData.clubs.splice(index, 1);
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.breederData.about || this.breederData.about == "") {
      this.invalidFields.push('about');
      isValid = false;
    }

    if (!this.breederData.howItStarted || this.breederData.howItStarted == "") {
      this.invalidFields.push('howItStarted');
      isValid = false;
    }

    if (!this.breederData.photo) {
      this.invalidFields.push('photo');
      isValid = false;
    }

    if (this.breederData.clubs.length == 0) {
      this.invalidFields.push('clubs');
      isValid = false;
    }

    return isValid;
  }

  saveChanges() {
    if (!this.validateInputFields())
      return;

    this.breederService.setAboutUsingPUT(this.breederData, this.appService.userData.id).subscribe(() => {
      this.appService.userData.about = this.breederData;
      scroll(0, 0);
    })
  }

}
