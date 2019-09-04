import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from '../../services/event-service/events.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { Parent, Puppy } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-add-puppy-profile-page',
  templateUrl: './add-puppy-profile-page.component.html',
  styleUrls: ['./add-puppy-profile-page.component.scss']
})
export class AddPuppyProfilePageComponent implements OnInit {

  DEFAULT_PUPPY_DATA: Puppy = {
    nickname: null,
    gender: "MALE",
    birthDate: null,
    breed: null,
    earmark: null,
    father: null,
    mother: null,
    about: null,
    price: null,
    gallery: []
  }

  puppiesData: Array<Puppy>;
  puppyDraft: Puppy;
  currentPuppyData: Puppy;
  fathers: Array<Parent> = [];
  mothers: Array<Parent> = [];

  birthdayModel: NgbDateStruct = { day: null, month: null, year: null };
  invalidFields: any[] = [];

  // What page to show - parents page or add/edit current parent
  isMainPage: boolean = true;

  @ViewChild('momDogInstance', { static: true }) momDogInstance: NgbTypeahead;
  @ViewChild('dadDogInstance', { static: true }) dadDogInstance: NgbTypeahead;
  @ViewChild('puppyBreedInstance', { static: true }) puppyBreedInstance: NgbTypeahead;
  momDogFocus$ = new Subject<string>();
  dadDogFocus$ = new Subject<string>();
  puppyBreedFocus$ = new Subject<string>();
  momDogClick$ = new Subject<string>();
  dadDogClick$ = new Subject<string>();
  puppyBreedClick$ = new Subject<string>();

  // Should corresponding adding buttons be displayed
  isDadEmptyButton: boolean = false;
  isMomEmptyButton: boolean = false;

  constructor(public appService: AppService, private popupService: PopupTemplateService, private notificationService: NotificationBarService,
    private eventService: EventService, public breederService: BreederControllerService) { }

  ngOnInit() {
    this.puppiesData = this.appService.userData.puppies;
    if (this.appService.userData.parentsInfo) {
      this.fathers = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "MALE");
      this.mothers = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "FEMALE");
    }
  }

  showCurrentPuppyPage(index: number): void {
    if (index == -1)
      this.currentPuppyData = this.appService.userData.puppyDraft
        ? this.appService.userData.puppyDraft : this.DEFAULT_PUPPY_DATA;
    else
      this.currentPuppyData = this.puppiesData[index];

    this.isMainPage = false;
  }

  onDadInputClick(event: any): void {
    this.dadDogFocus$.next(event.target.value);
    this.isDadEmptyButton = this.fathers.length == 0;
  }

  onMomInputClick(event: any): void {
    this.momDogFocus$.next(event.target.value);
    this.isMomEmptyButton = this.mothers.length == 0;
  }

  getCurrentMaxDate(): any {
    let date = new Date();
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  updateSelectedDate() {
    this.birthdayModel = { year: this.birthdayModel.year, month: this.birthdayModel.month, day: this.birthdayModel.day };
  }

  previewPuppyImage(index: number): void {
    this.popupService.setPopupParams({
      width: 210, height: 180, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.currentPuppyData.gallery[index].main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPetImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        if (index == -1)
          this.currentPuppyData.gallery.push(imageData);
        else
          this.currentPuppyData.gallery[index] = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  deletePuppyImage(index: number): void {
    this.currentPuppyData.gallery.splice(index, 1);
  }

  addPuppy(): void {
    if (!this.validateInputFields())
      return;
    // TODO: change adding or refreshing condition based on parents' id
    if (this.puppiesData.filter(it => it.nickname == this.currentPuppyData.nickname).length > 0)
      this.puppiesData.map(it => {
        if (it.nickname == this.currentPuppyData.nickname)
          it = this.currentPuppyData;
      });
    else
      this.puppiesData.push(this.currentPuppyData);

    this.currentPuppyData = null;
    this.isMainPage = true;
  }

  deletePuppy(index: number): void {
    this.puppiesData.splice(index, 1);
  }

  saveDraft() {
    this.breederService.setPuppyDraftUsingPUT(this.appService.userData.id, this.currentPuppyData).subscribe(() => {
      this.appService.userData.puppyDraft = this.currentPuppyData;
      this.currentPuppyData = null;
      this.isMainPage = true;
      this.notificationService.setContext('Черновик успешно сохранен', true);
      this.notificationService.setVisibility(true);
      scroll(0, 0);
    },
      () => {
        this.notificationService.setContext('Черновик не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      }
    );
  }

  saveChanges() {
    if (!this.validateInputFields())
      return;

    this.breederService.setPuppiesUsingPUT(this.appService.userData.id, this.puppiesData).subscribe(() => {
      this.appService.userData.puppies = this.puppiesData;
      this.isMainPage = true;
      this.notificationService.setContext('Изменения успешно сохранены', true);
      this.notificationService.setVisibility(true);
      scroll(0, 0);
    },
      () => {
        this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      }
    );
  }


  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];
    if (!this.currentPuppyData.nickname || this.currentPuppyData.nickname == "") {
      this.invalidFields.push('name');
      isValid = false;
    }

    if (!this.currentPuppyData.breed || this.currentPuppyData.breed == "") {
      this.invalidFields.push('breed');
      isValid = false;
    }

    if (!this.birthdayModel.day || !this.birthdayModel.month || !this.birthdayModel.year) {
      this.invalidFields.push('birthday');
      isValid = false;
    }

    if (!this.currentPuppyData.earmark || this.currentPuppyData.earmark == "") {
      this.invalidFields.push('stigma');
      isValid = false;
    }

    if (!this.currentPuppyData.father) {
      this.invalidFields.push('dad');
      isValid = false;
    }

    if (!this.currentPuppyData.mother) {
      this.invalidFields.push('mom');
      isValid = false;
    }

    if (this.currentPuppyData.gallery.length == 0) {
      this.invalidFields.push('photos');
      isValid = false;
    }

    if (!this.currentPuppyData.about || this.currentPuppyData.about == "") {
      this.invalidFields.push('info');
      isValid = false;
    }

    if (!this.currentPuppyData.price) {
      this.invalidFields.push('price');
      isValid = false;
    }
    return isValid;
  }

}
