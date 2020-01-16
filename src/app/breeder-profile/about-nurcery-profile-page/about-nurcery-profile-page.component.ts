import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from 'src/app/services/popup-service/popup-template.service';
import { EventService } from 'src/app/services/event-service/events.service';
import { BreederInfo } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from '../../services/breeder-profile-service/breeder-profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-about-nurcery-profile-page',
  templateUrl: './about-nurcery-profile-page.component.html',
  styleUrls: ['./about-nurcery-profile-page.component.scss']
})
export class AboutNurceryProfilePageComponent implements OnInit {

  nurceryData: BreederInfo;

  curMainBreed: string;
  curExtraBreed: string;
  isAdditionalBreed: boolean = false;
  saveChagesEvent: any;

  @ViewChild('cityInstance', { static: true }) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', { static: true }) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', { static: true }) addBreedInstance: NgbTypeahead;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(public appService: AppService, private popupService: PopupTemplateService, private notificationService: NotificationBarService,
    private eventService: EventService, private breederService: BreederControllerService, public profileService: BreederProfileService,
    private router: Router) { }

  ngOnInit() {
    this.nurceryData = this.appService.userData.generalInfo ? <BreederInfo>this.appService.userData.generalInfo : {
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
    this.isAdditionalBreed = this.nurceryData.extraBreed ? true : false;
    this.curMainBreed = this.nurceryData.mainBreed ? this.nurceryData.mainBreed.name : null;
    this.curExtraBreed = this.nurceryData.extraBreed ? this.nurceryData.extraBreed.name : null;
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', (forPreview) => this.saveChanges(forPreview));
  }

  ngOnDestroy(): void {
    this.saveChagesEvent.unsubscribe();
  }
  onCityClick(event: any) {
    this.profileService.inputValueChanged('city');
    this.cityClick$.next(event.target.value);
  }

  onMainBreedClick(event: any) {
    this.profileService.inputValueChanged('mainBreed');
    this.mainBreedClick$.next(event.target.value);
  }

  onExtraBreedClick(event: any) {
    this.profileService.inputValueChanged('extraBreed');
    this.addBreedClick$.next(event.target.value);
  }

  previewNurceryPhoto(): void {
    this.popupService.setPopupParams({
      width: 200, height: 200, isRect: false,
      imageUrl: this.nurceryData.profilePhoto ? "/img/" + this.nurceryData.profilePhoto.main + ".jpg" : null
    });
    this.popupService.setCurrentForm('image-cropper');
    this.popupService.setShowStatus(true);
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadAvatarImage(body).subscribe((imageData: any) => {
        this.profileService.inputValueChanged('profilePhoto');
        this.popupService.setShowStatus(false);
        this.nurceryData.profilePhoto = imageData;
      }, (err) => {
        if (err.status == 415) {
          this.popupService.setShowStatus(false);
          this.notificationService.setContext('Не удалось сконвертировать фотографию. Выберите другую.', false);
          this.notificationService.setVisibility(true);
        }
      });
      croppedHandler.unsubscribe();
    });
    let cropperClosedHandler = this.eventService.subscribe('image-cropper-closed', () => {
      croppedHandler.unsubscribe();
      cropperClosedHandler.unsubscribe();
    });
  }

  previewGalleryPhoto(index: number): void {
    this.popupService.setPopupParams({
      width: 360, height: 360, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.nurceryData.gallery[index].main + ".jpg" : null
    });
    this.popupService.setCurrentForm('image-cropper');
    this.popupService.setShowStatus(true);
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadNurceryGalleryImage(body).subscribe((imageData: any) => {
        this.profileService.inputValueChanged('gallery');
        this.popupService.setShowStatus(false);
        if (index == -1)
          this.nurceryData.gallery.push(imageData);
        else
          this.nurceryData.gallery[index] = imageData;
      }, (err) => {
        if (err.status == 415) {
          this.popupService.setShowStatus(false);
          this.notificationService.setContext('Не удалось сконвертировать фотографию. Выберите другую.', false);
          this.notificationService.setVisibility(true);
        }
      });
      croppedHandler.unsubscribe();
    });
    let cropperClosedHandler = this.eventService.subscribe('image-cropper-closed', () => {
      croppedHandler.unsubscribe();
      cropperClosedHandler.unsubscribe();
    });
  }

  deleteExtraBreed(): void {
    this.nurceryData.extraBreed = null;
    this.isAdditionalBreed = false;
    this.curExtraBreed = null;
    this.profileService.dataChangesSaved = false;
  }

  deleteGalleryImage(index: number): void {
    this.nurceryData.gallery.splice(index, 1);
    this.profileService.dataChangesSaved = false;
  }

  saveChanges(forPreview: boolean) {
    if (!this.validateInputFields())
      return;

    this.nurceryData.mainBreed = this.appService.breeds.filter(it => it.name == this.curMainBreed)[0] || { name: this.curMainBreed };
    if (!this.nurceryData.name)
      this.nurceryData.name = this.appService.userData.name + " " + this.appService.userData.surname;
    if (this.curExtraBreed && this.curExtraBreed != "")
      this.nurceryData.extraBreed = this.appService.breeds.filter(it => it.name == this.curExtraBreed)[0] || { name: this.curExtraBreed };
    this.breederService.setGeneralInfoUsingPUT(this.nurceryData, this.appService.userData.id)
      .subscribe(() => {
        if (!this.appService.userData.generalInfo) {
          //@ts-ignore
          ym(55779592, 'reachGoal', 'ShelterSave');
          //@ts-ignore
          gtag('event', 'ShelterSave');
          //@ts-ignore
          Intercom('trackEvent', 'ShelterSave');
        }
        this.appService.userData.generalInfo = this.nurceryData;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        this.profileService.dataChangesSaved = true;
        scroll(0, 0);
        this.profileService.updateProfileFullness();
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

  validateInputFields(): boolean {
    let isValid = true;
    this.profileService.invalidFields = [];

    if (this.nurceryData.name && this.nurceryData.name.length > 128) {
      this.profileService.invalidFields.push('name');
      isValid = false;
    }


    if (!this.curMainBreed || this.appService.breeds.filter(it => it.name == this.curMainBreed).length == 0) {
      this.profileService.invalidFields.push('mainBreed');
      isValid = false;
    }

    if (this.curExtraBreed && this.appService.breeds.filter(it => it.name == this.curExtraBreed).length == 0) {
      this.profileService.invalidFields.push('extraBreed');
      isValid = false;
    }

    if (this.curMainBreed && this.curExtraBreed && this.curMainBreed == this.curExtraBreed) {
      this.profileService.invalidFields.push('mainBreed');
      this.profileService.invalidFields.push('extraBreed');
      isValid = false;
    }

    if (!this.nurceryData.city || this.nurceryData.city == "" || this.nurceryData.city.length > 128) {
      this.profileService.invalidFields.push('city');
      isValid = false;
    }

    if (!this.nurceryData.description || this.nurceryData.description == "" || this.nurceryData.description.length > 600) {
      this.profileService.invalidFields.push('desc');
      isValid = false;
    }

    if (!this.nurceryData.profilePhoto) {
      this.profileService.invalidFields.push('profilePhoto');
      isValid = false;
    }

    if (this.nurceryData.gallery.length == 0) {
      this.profileService.invalidFields.push('gallery');
      isValid = false;
    }
    return isValid;
  }
}
