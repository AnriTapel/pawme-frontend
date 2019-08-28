import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { EventService } from '../../services/event-service/events.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';

@Component({
  selector: 'app-add-puppy-profile-page',
  templateUrl: './add-puppy-profile-page.component.html',
  styleUrls: ['./add-puppy-profile-page.component.scss']
})
export class AddPuppyProfilePageComponent implements OnInit {

  DEFAULT_PUPPY_DATA = {
    name: null,
    isMale: true,
    birthday: null,
    breed: null,
    stigmaCode: null,
    dadId: null,
    momId: null,
    info: null,
    price: null,
    photos: []
  }
  puppiesData: any;
  curPuppyImages: any = [];
  currentPuppyData: any;

  birthdayModel: NgbDateStruct = {day: null, month: null, year: null};
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

  constructor(public appService: AppService, private popupService: PopupTemplateService,
    private eventService: EventService) { }

  ngOnInit() {
    this.puppiesData = {
      puppies: [],
      parents: [],
      puppyDraft: null
    }
  }

  showCurrentPuppyPage(index: number): void {
    if (index == -1)
      this.currentPuppyData = this.puppiesData.puppyDraft ? this.puppiesData.puppyDraft : this.DEFAULT_PUPPY_DATA;
    else
      this.currentPuppyData = this.puppiesData.puppies[index];

    this.isMainPage = false;
  }

  getCurrentMaxDate() :any{
    let date = new Date();
    return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  updateSelectedDate(){
   this.birthdayModel = {year: this.birthdayModel.year, month: this.birthdayModel.month, day: this.birthdayModel.day}; 
  }

  saveDraft(): void{

  }

  previewPuppyImage(): void{
    this.popupService.setPopupParams({width: 210, height: 180, isRect: true});
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPetImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.currentPuppyData.photos.push(imageData);
        this.curPuppyImages.push("http://petman.co/img/" + imageData.preview + ".jpg");
      });
      croppedHandler.unsubscribe();
    });
  }

  deletePuppyImage(index: number): void{
    this.curPuppyImages.splice(index, 1);
    this.currentPuppyData.photos.splice(index, 1);
  }

  addPuppy(): void{
    if (!this.validateInputFields())
      return;
  }

  validateInputFields(): boolean{
    let isValid= true;
    this.invalidFields = [];
    if (!this.currentPuppyData.name || this.currentPuppyData.name == ""){
      this.invalidFields.push('name');
      isValid = false;
    }

    if (!this.currentPuppyData.breed || this.currentPuppyData.breed == ""){
      this.invalidFields.push('breed');
      isValid = false;
    }

    if (!this.birthdayModel.day || !this.birthdayModel.month || !this.birthdayModel.year){
      this.invalidFields.push('birthday');
      isValid = false;
    }

    if (!this.currentPuppyData.stigmaCode || this.currentPuppyData.stigmaCode == ""){
      this.invalidFields.push('stigma');
      isValid = false;
    }

    if (!this.currentPuppyData.dadId){
      this.invalidFields.push('dad');
      isValid = false;
    }

    if (!this.currentPuppyData.momId){
      this.invalidFields.push('mom');
      isValid = false;
    }

    if (this.currentPuppyData.photos.length == 0){
      this.invalidFields.push('photos');
      isValid = false;
    }

    if (!this.currentPuppyData.info || this.currentPuppyData.info == ""){
      this.invalidFields.push('info');
      isValid = false;
    }

    if (!this.currentPuppyData.price){
      this.invalidFields.push('price');
      isValid = false;
    }
    return isValid;
  }

}
