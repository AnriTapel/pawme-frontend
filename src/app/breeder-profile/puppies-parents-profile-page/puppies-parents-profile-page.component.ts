import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { EventService } from '../../services/event-service/events.service';
import { ParentsInfo, ParentTest, Parent } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-puppies-parents-profile-page',
  templateUrl: './puppies-parents-profile-page.component.html',
  styleUrls: ['./puppies-parents-profile-page.component.scss']
})
export class PuppiesParentsProfilePageComponent implements OnInit {

  DEFAULT_PARENT_DATA: Parent = {
    nickname: null,
    gender: 'MALE',
    breed: null,
    gallery: [],
    info: null,
    id: null
  }
  parentsData: ParentsInfo;
  currentParentData: Parent;

  currentBodyPart: string;
  currentMedicalTest: string;
  currentBreed: string;

  invalidAddingFields: any[] = [];
  invalidGeneralFields: any[] = [];

  parentTests: Object = {
    "Бедра": ["Тест на дисплазию тазобедренного сустава (по стандартам РКФ)"],
    "Локти": ["Тест на дисплазию локтевых суставов (по стандартам РКФ)"],
    "Колени": ["Тест на дисплазию коленных суставов (по стандартам РКФ)"],
    "Глаза": ["Проверка у офтальмолога"],
    "Сердце": ["Обследование у кардиолога"],
    "Анализы": ["Общий анализ крови", "Анализ мочи", "Анализ кала", "Биохимический анализ крови"],
    "Генетика": ["Парочка наших вариантов"],
    "Щитовидная железа": ["Анализ щитовидной железы"],
    "Другое": ["Парочка наших вариантов"]
  };

  testsCategories: Array<string> = Object.keys(this.parentTests);

  // What page to show - parents page or add/edit current parent
  isMainPage: boolean = true;

  @ViewChild('bodyPartInstance', { static: true }) bodyPartInstance: NgbTypeahead;
  @ViewChild('medicalTestInstance', { static: true }) medicalTestInstance: NgbTypeahead;
  @ViewChild('parentBreedInstance', { static: true }) parentBreedInstance: NgbTypeahead;
  bodyPartFocus$ = new Subject<string>();
  medicalTestFocus$ = new Subject<string>();
  parentBreedFocus$ = new Subject<string>();
  bodyPartClick$ = new Subject<string>();
  medicalTestClick$ = new Subject<string>();
  parentBreedClick$ = new Subject<string>();

  constructor(public appService: AppService, private popupService: PopupTemplateService,
    private eventService: EventService, private breederService: BreederControllerService,
    private notificationService: NotificationBarService) { }

  ngOnInit() {

    this.parentsData = <ParentsInfo>this.appService.userData.parentsInfo || {
      parents: [],
      parentTests: [],
    };
  }

  addMedical(): void {
    let curMedical: ParentTest = {
      category: this.currentBodyPart,
      name: this.currentMedicalTest
    }
    this.parentsData.parentTests.push(curMedical);
    this.currentBodyPart = null;
    this.currentMedicalTest = null;
  }

  deleteMedical(index: number): void {
    this.parentsData.parentTests.splice(index, 1);
  }

  showCurrentParentPage(index: number): void {
    if (index == -1)
      this.currentParentData = this.appService.userData.parentDraft || this.DEFAULT_PARENT_DATA;
    else 
      this.currentParentData = this.parentsData.parents[index];
    
    this.currentBreed = this.currentParentData.breed ? this.currentParentData.breed.name : null;
    this.isMainPage = false;
  }

  previewParentImage(index: number): void {
    this.popupService.setPopupParams({
      width: 210, height: 180, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.currentParentData.gallery[index].main + ".jpg" : null
    });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPetImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        if (index == -1)
          this.currentParentData.gallery.push(imageData);
        else
          this.currentParentData.gallery[index] = imageData;
      });
      croppedHandler.unsubscribe();
    });
  }

  deleteParentImage(index: number): void {
    this.currentParentData.gallery.splice(index, 1);
  }

  addParent() {
    if (!this.validateAddingFields())
      return;
    // TODO: change adding or refreshing condition based on parents' id
    this.currentParentData.breed = this.appService.breeds.filter(it => it.name == this.currentBreed)[0] || {name: this.currentBreed};
    if (this.parentsData.parents.filter(it => it.nickname == this.currentParentData.nickname && it.id == this.currentParentData.id ).length > 0)
      this.parentsData.parents.map(it => {
        if (it.nickname == this.currentParentData.nickname)
          it = this.currentParentData;
      });
    else
      this.parentsData.parents.push(this.currentParentData);

    this.currentParentData = null;
    this.currentBreed = null;
    this.isMainPage = true;
    scroll(0, 0);
  }

  deleteParent(index: number): void {
    this.parentsData.parents.splice(index, 1);
  }

  saveDraft() {
    if (this.currentBreed && this.currentBreed != "")
      this.currentParentData.breed = this.appService.breeds.filter(it => it.name == this.currentBreed)[0] || { name: this.currentBreed };
    this.breederService.setParentDraftUsingPUT(this.appService.userData.id, this.currentParentData).subscribe(() => {
      this.appService.userData.parentDraft = this.currentParentData;
      this.currentParentData = null;
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
    if (!this.validateGeneralFields())
      return;
    this.breederService.setParentsInfoUsingPUT(this.appService.userData.id, this.parentsData).subscribe( () => {
      if (!this.appService.userData.parentsInfo)
        this.appService.userData.profileFill++;
      this.appService.userData.parentsInfo = this.parentsData;
      this.currentParentData = null;
      this.appService.userData.parentDraft = null;
      this.isMainPage = true;
      this.notificationService.setContext('Изменения успешно сохранены', true);
      this.notificationService.setVisibility(true);
      scroll(0,0);
    },
    () => {
      this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
      this.notificationService.setVisibility(true);
      scroll(0,0);
    }
    );
  }

  validateGeneralFields(): boolean {
    let isValid = true;
    this.invalidGeneralFields = [];
    if (this.parentsData.parents.length == 0) {
      this.invalidGeneralFields.push('parents');
      isValid = false;
    }

    if (this.parentsData.parentTests.length == 0) {
      this.invalidGeneralFields.push('tests');
      isValid = false;
    }

    return isValid;
  }

  validateAddingFields(): boolean{
    let isValid = true;
    this.invalidAddingFields = [];
    if (!this.currentParentData.nickname || this.currentParentData.nickname == "") {
      this.invalidAddingFields.push('name');
      isValid = false;
    }

    if (!this.currentBreed || this.currentBreed == "") {
      this.invalidAddingFields.push('breed');
      isValid = false;
    }

    if (this.currentParentData.gallery.length == 0) {
      this.invalidAddingFields.push('photos');
      isValid = false;
    }

    if (!this.currentParentData.info || this.currentParentData.info == "") {
      this.invalidAddingFields.push('info');
      isValid = false;
    }

    return isValid; 
  }

}
