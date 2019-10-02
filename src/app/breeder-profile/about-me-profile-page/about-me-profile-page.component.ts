import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from 'src/app/services/event-service/events.service';
import { BreederAbout } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from '../../services/breeder-profile-service/breeder-profile.service';

@Component({
  selector: 'app-about-me-profile-page',
  templateUrl: './about-me-profile-page.component.html',
  styleUrls: ['./about-me-profile-page.component.scss']
})
export class AboutMeProfilePageComponent implements OnInit {

  breederData: BreederAbout;
  currentClub: string = null;
  currentClubs: Array<string> = [];

  invalidFields: Array<string> = [];
  saveChagesEvent: any;

  constructor(private popupService: PopupTemplateService, private appService: AppService, private eventService: EventService,
    private breederService: BreederControllerService, private notificationService: NotificationBarService, public profileService: BreederProfileService) { }

  ngOnInit() {
    this.breederData = this.appService.userData.about ? <BreederAbout>this.appService.userData.about : {
      about: null,
      howItStarted: null,
      outstandingInfo: null,
      photo: null,
      clubs: null,
      certificates: []
    }
    if (this.breederData.clubs) {
      this.currentClubs = this.breederData.clubs.split(";");
    }
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', () => this.saveChanges());
  }

  ngOnDestroy(): void {
    this.saveChagesEvent.unsubscribe();
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
        this.profileService.dataChangesSaved = false;
      });
      croppedHandler.unsubscribe();
    });
  }

  deletePersonalImage(): void {
    this.breederData.photo = null;
    this.profileService.dataChangesSaved = false;
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
            this.profileService.dataChangesSaved = false;
          });
        }
        img.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }

  deleteCertificate(index: number): void {
    this.breederData.certificates.splice(index, 1);
    this.profileService.dataChangesSaved = false;
  }

  addClub(): void {
    this.currentClubs.push(this.currentClub);
    this.currentClub = null;
    this.profileService.dataChangesSaved = false;
  }

  deleteClub(index: number): void {
    this.currentClubs.splice(index, 1);
    this.profileService.dataChangesSaved = false;
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.breederData.about || this.breederData.about == "") {
      this.invalidFields.push('about');
      isValid = false;
    }

    if (!this.breederData.outstandingInfo || this.breederData.outstandingInfo == "") {
      this.invalidFields.push('outstanding');
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

    return isValid;
  }

  saveChanges() {
    if (!this.validateInputFields())
      return;

    this.breederData.clubs = this.currentClubs.join(";");
    this.breederService.setAboutUsingPUT(this.breederData, this.appService.userData.id).subscribe(
      () => {
        this.profileService.updateProfileFullness();
        this.appService.userData.about = this.breederData;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
        this.profileService.dataChangesSaved = true;
      },
      () => {
        this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      }
    );
  }

}
