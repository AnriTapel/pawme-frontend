import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from 'src/app/services/event-service/events.service';
import { BreederAbout } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from '../../services/breeder-profile-service/breeder-profile.service';
import { Router } from '@angular/router';

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

  constructor(private popupService: PopupTemplateService, public appService: AppService, private eventService: EventService, private router: Router,
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
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', (forPreview) => this.saveChanges(forPreview));
  }

  ngOnDestroy(): void {
    this.saveChagesEvent.unsubscribe();
  }

  previewPersonalImage() {
    this.popupService.setPopupParams({
      width: 270, height: 200, isRect: true,
      imageUrl: this.breederData.photo ? "/img/" + this.breederData.photo.main + ".jpg" : null
    });
    this.popupService.setCurrentForm('image-cropper');
    this.popupService.setShowStatus(true);
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPersonalImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.breederData.photo = imageData;
        this.profileService.dataChangesSaved = false;
      });
      croppedHandler.unsubscribe();
    });
    let cropperClosedHandler = this.eventService.subscribe('image-cropper-closed', () => {
      croppedHandler.unsubscribe();
      cropperClosedHandler.unsubscribe();
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
    if (!this.currentClub || this.currentClub == "")
      return;
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

    if (!this.breederData.about || this.breederData.about == "" || this.breederData.about.length > 2048) {
      this.invalidFields.push('about');
      isValid = false;
    }

    if (!this.breederData.outstandingInfo || this.breederData.outstandingInfo == "" || this.breederData.outstandingInfo.length > 2048) {
      this.invalidFields.push('outstanding');
      isValid = false;
    }

    if (!this.breederData.howItStarted || this.breederData.howItStarted == "" || this.breederData.howItStarted.length > 2048) {
      this.invalidFields.push('howItStarted');
      isValid = false;
    }

    if (!this.breederData.photo) {
      this.invalidFields.push('photo');
      isValid = false;
    }

    return isValid;
  }

  saveChanges(forPreview: boolean) {
    if (!this.validateInputFields())
      return;

    this.breederData.clubs = this.currentClubs.join(";");
    this.breederService.setAboutUsingPUT(this.breederData, this.appService.userData.id).subscribe(
      () => {
        if (!this.appService.userData.about) {
          //@ts-ignore
          ym(55779592, 'reachGoal', 'SelfSave');
          //@ts-ignore
          Intercom('trakcEvent', 'SelfSave');
        }
        this.appService.userData.about = this.breederData;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
        this.profileService.updateProfileFullness();
        this.profileService.dataChangesSaved = true;
        if (forPreview)
          window.open('/breeder/' + this.appService.userData.id, '_blank');
      },
      (err) => {
        if (err.status == 423)
          this.notificationService.setContext('К сожалению, ваш аккаунт заблокирован. Help@petman.co', false);
        else if (err.status == 403)
          this.router.navigateByUrl('/login');
        else
          this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      }
    );
  }

}
