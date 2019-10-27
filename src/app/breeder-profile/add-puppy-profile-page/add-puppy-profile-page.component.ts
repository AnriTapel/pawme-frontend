import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from '../../services/event-service/events.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { Parent, Puppy } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from 'src/app/services/breeder-profile-service/breeder-profile.service';
import { AlertService } from '../../services/alert-service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-puppy-profile-page',
  templateUrl: './add-puppy-profile-page.component.html',
  styleUrls: ['./add-puppy-profile-page.component.scss']
})
export class AddPuppyProfilePageComponent implements OnInit {

  DEFAULT_PUPPY_DATA: Puppy = {
    id: null,
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
  currentPuppyData: Puppy;
  fathers: Array<Parent> = [];
  mothers: Array<Parent> = [];

  curMotherNickname: string;
  curFatherNickname: string;
  curBreed: string;
  saveChagesEvent: any;
  addNewParentEvent: any;

  birthdayModel: NgbDateStruct = { day: null, month: null, year: null };

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
    private eventService: EventService, public profileService: BreederProfileService, public breederService: BreederControllerService,
    private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.puppiesData = this.appService.userData.puppies;
    if (this.appService.userData.parentsInfo) {
      this.fathers = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "MALE");
      this.mothers = this.appService.userData.parentsInfo.parents.filter(it => it.gender == "FEMALE");
    }
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', (forPreview) => {
      this.preSaveOperation();
      if (this.currentPuppyData && !this.currentPuppyData.id)
        this.saveDraft();
      else
        this.saveChanges(forPreview);
    });
    
    this.addNewParentEvent = this.eventService.subscribe('save-puppy-draft-before-parents-page', () => {
      this.preSaveOperation();
      this.breederService.setPuppyDraftUsingPUT(this.appService.userData.id, this.currentPuppyData).subscribe(() => {
        this.profileService.dataChangesSaved = true;
        this.appService.userData.puppyDraft = JSON.parse(JSON.stringify(this.currentPuppyData));
        this.currentPuppyData = null;
        this.birthdayModel = { day: null, month: null, year: null };
        this.notificationService.setContext('Черновик успешно сохранен', true);
        this.notificationService.setVisibility(true);
        this.profileService.setCurProfilePage(this.profileService.profileSubpages[2]);
        scroll(0, 0);
      },
        () => {
          this.notificationService.setContext('Черновик не были сохранены, попробуйте еще раз', false);
          this.notificationService.setVisibility(true);
          scroll(0, 0);
        }
      );
    });
  }

  ngOnDestroy(): void{
    this.saveChagesEvent.unsubscribe();
    this.addNewParentEvent.unsubscribe();
  }

  showCurrentPuppyPage(index: number): void {
    if (index == -1) {
      this.currentPuppyData = this.appService.userData.puppyDraft ? this.appService.userData.puppyDraft
        : JSON.parse(JSON.stringify(this.DEFAULT_PUPPY_DATA));
      this.currentPuppyData.id = null;
    } else
      this.currentPuppyData = this.puppiesData[index];

    if (this.currentPuppyData.birthDate) {
      let birthDate = this.currentPuppyData.birthDate.split("-");
      this.birthdayModel = { year: parseInt(birthDate[0]) || null, month: parseInt(birthDate[1]) || null, day: parseInt(birthDate[2]) || null };
    } else
      this.birthdayModel = { year: null, month: null, day: null };
    this.curFatherNickname = this.currentPuppyData.father ? this.currentPuppyData.father.nickname : null;
    this.curMotherNickname = this.currentPuppyData.mother ? this.currentPuppyData.mother.nickname : null;
    this.curBreed = this.currentPuppyData.breed ? this.currentPuppyData.breed.name : null;
    this.isMainPage = false;
    scroll(0,0);
  }

  onDadInputClick(event: any): void {
    this.dadDogFocus$.next(event.target.value);
    this.profileService.inputValueChanged('dad');
    this.isDadEmptyButton = this.fathers.length == 0;
  }

  onMomInputClick(event: any): void {
    this.momDogFocus$.next(event.target.value);
    this.profileService.inputValueChanged('mom');
    this.isMomEmptyButton = this.mothers.length == 0;
  }

  getCurrentMaxDate(): any {
    let date = new Date();
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  switchGender(): void {
    this.currentPuppyData.gender = this.currentPuppyData.gender == 'MALE' ? 'FEMALE' : 'MALE';
    this.profileService.dataChangesSaved = false;
  }

  updateSelectedDate(): void {
    this.birthdayModel = { year: this.birthdayModel.year, month: this.birthdayModel.month, day: this.birthdayModel.day };
    this.profileService.inputValueChanged('birthday');
  }

  switchToParentsSubpage(): void {
    if (!this.profileService.dataChangesSaved) {
      let onSuccess = () => {
        this.profileService.dataChangesSaved = true;
        this.profileService.setCurProfilePage(this.profileService.profileSubpages[2]);
        scroll(0, 0);
      };

      let onError = () => {
        this.eventService.raiseEvent('save-puppy-draft-before-parents-page', null);
      };

      this.alertService.showDialog("Вы не сохранили изменения", "warning-title",
        ["Все несохраненные изменения будут утеряны. Перейти в другой раздел?"],
        "Перейти без сохранения", "custom-btn btn-transparent", "Сохранить изменения", "custom-btn btn-purple", onSuccess, onError);
    } else 
      this.profileService.setCurProfilePage(this.profileService.profileSubpages[2]);
  }

  previewPuppyImage(index: number): void {
    this.popupService.setPopupParams({
      width: 210, height: 180, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.currentPuppyData.gallery[index].main + ".jpg" : null
    });
    this.popupService.setCurrentForm('image-cropper');
    this.popupService.setShowStatus(true);
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPetImage(body).subscribe((imageData: any) => {
        this.profileService.inputValueChanged('photos');
        this.popupService.setShowStatus(false);
        if (index == -1)
          this.currentPuppyData.gallery.push(imageData);
        else
          this.currentPuppyData.gallery[index] = imageData;
      });
      croppedHandler.unsubscribe();
    });
    let cropperClosedHandler = this.eventService.subscribe('image-cropper-closed', () => {
      croppedHandler.unsubscribe();
      cropperClosedHandler.unsubscribe();
    });
  }

  deletePuppyImage(index: number): void {
    this.currentPuppyData.gallery.splice(index, 1);
    this.profileService.dataChangesSaved = false;
  }

  addPuppy(): void {
    if (!this.validateInputFields())
      return;

    this.preSaveOperation();
    if (!this.currentPuppyData.id)
      this.puppiesData.push(this.currentPuppyData);
    this.saveChanges(false);
  }

  deletePuppy(index: number): void {
    this.puppiesData.splice(index, 1);
    this.saveChanges(false);
  }

  saveDraft() {
    this.preSaveOperation();
    this.breederService.setPuppyDraftUsingPUT(this.appService.userData.id, this.currentPuppyData).subscribe(() => {
      this.profileService.dataChangesSaved = true;
      this.appService.userData.puppyDraft = JSON.parse(JSON.stringify(this.currentPuppyData));
      this.currentPuppyData = null;
      this.birthdayModel = { day: null, month: null, year: null };
      this.isMainPage = true;
      this.notificationService.setContext('Черновик успешно сохранен', true);
      this.notificationService.setVisibility(true);
      scroll(0, 0);
    },
      (err) => {
        if (err.status == 403)
          this.router.navigateByUrl('/login');
        this.notificationService.setContext('Черновик не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
      }
    );
  }

  saveChanges(forPreview: boolean) {
    this.breederService.setPuppiesUsingPUT(this.appService.userData.id, this.puppiesData).subscribe(() => {
      this.breederService.getBreederUsingGET(this.appService.userData.id).subscribe(res => {
        this.profileService.dataChangesSaved = true;
        this.appService.userData = res;
        this.puppiesData = res.puppies;
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        this.isMainPage = true;
        this.currentPuppyData = null;
        this.appService.userData.puppyDraft = null;
        this.birthdayModel = { day: null, month: null, year: null };
        scroll(0, 0);
        if (forPreview)
          window.open('/breeder/' + this.appService.userData.id, '_blank');
      });
    },
      (err) => {
        if (err.status == 423)
          this.notificationService.setContext('К сожалению, ваш аккаунт заблокирован. Help@petman.co', false);
        else if (err.status == 403)
          this.router.navigateByUrl('/login');
        else
          this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        if (!this.currentPuppyData.id)
          this.puppiesData.pop();
        scroll(0, 0);
      }
    );
  }

  preSaveOperation(): void {
    if (this.birthdayModel.day && this.birthdayModel.month && this.birthdayModel.year)
      this.currentPuppyData.birthDate = this.getDateAsString();
    else
      this.currentPuppyData.birthDate = null;
    // Recovering father & mother objects by nickname
    if (this.curFatherNickname && this.curFatherNickname != "")
      this.currentPuppyData.father = this.fathers.filter(it => it.nickname == this.curFatherNickname)[0];
    if (this.curMotherNickname && this.curMotherNickname != "")
      this.currentPuppyData.mother = this.mothers.filter(it => it.nickname == this.curMotherNickname)[0];
    // Recovering breed
    if (this.curBreed && this.curBreed != "")
      this.currentPuppyData.breed = this.appService.breeds.filter(it => it.name == this.curBreed)[0] || { name: this.curBreed };
  }

  getDateAsString(): string {
    let day = '00', month = '00', year = '0000';
    if (this.birthdayModel.day)
      day = this.birthdayModel.day > 9 ? this.birthdayModel.day.toString() : "0" + this.birthdayModel.day;
    if (this.birthdayModel.month)
      month = this.birthdayModel.month > 9 ? this.birthdayModel.month.toString() : "0" + this.birthdayModel.month;
    if (this.birthdayModel.year)
      year = this.birthdayModel.year < 100 ? "20" + this.birthdayModel.year : this.birthdayModel.year.toString();
    return year + "-" + month + "-" + day;
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.profileService.invalidFields = [];
    if (!this.currentPuppyData.nickname || this.currentPuppyData.nickname == "" || this.currentPuppyData.nickname.length > 32) {
      this.profileService.invalidFields.push('name');
      isValid = false;
    }

    if (!this.curBreed || this.curBreed == "" || this.appService.breeds.filter(it => it.name == this.curBreed).length == 0) {
      this.profileService.invalidFields.push('breed');
      isValid = false;
    }

    if ((!this.birthdayModel.day || !this.birthdayModel.month || !this.birthdayModel.year) || 
        (new Date().getTime() < new Date(this.birthdayModel.month + '-' + this.birthdayModel.day + '-' + this.birthdayModel.year).getTime()) || 
        (this.birthdayModel.day > 31 || this.birthdayModel.month > 12 || this.birthdayModel.year > new Date().getFullYear()) || 
        (this.birthdayModel.day < 1 || this.birthdayModel.month < 1 || this.birthdayModel.year < 1)) {
      this.profileService.invalidFields.push('birthday');
      isValid = false;
    }

    if (!this.currentPuppyData.earmark || this.currentPuppyData.earmark == "" || this.currentPuppyData.earmark.length > 64) {
      this.profileService.invalidFields.push('stigma');
      isValid = false;
    }

    if (!this.curFatherNickname || this.curFatherNickname == "" || this.fathers.filter(it => it.nickname == this.curFatherNickname).length == 0) {
      this.profileService.invalidFields.push('dad');
      isValid = false;
    }

    if (!this.curMotherNickname || this.curMotherNickname == "" || this.mothers.filter(it => it.nickname == this.curMotherNickname).length == 0) {
      this.profileService.invalidFields.push('mom');
      isValid = false;
    }

    if (this.currentPuppyData.gallery.length == 0) {
      this.profileService.invalidFields.push('photos');
      isValid = false;
    }

    if (!this.currentPuppyData.about || this.currentPuppyData.about == "" || this.currentPuppyData.about.length > 512) {
      this.profileService.invalidFields.push('info');
      isValid = false;
    }

    if (!this.currentPuppyData.price || this.currentPuppyData.price > 500000 || this.currentPuppyData.price < 1) {
      this.profileService.invalidFields.push('price');
      isValid = false;
    }
    return isValid;
  }

}
