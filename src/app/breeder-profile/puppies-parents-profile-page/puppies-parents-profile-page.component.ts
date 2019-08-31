import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { EventService } from '../../services/event-service/events.service';
import { ParentsInfo, ParentTest, Parent } from 'src/app/model/models';

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
    info: null
  }
  parentsData: ParentsInfo;
  parentDraft: any;
  currentParentData: Parent;

  currentBodyPart: string;
  currentMedicalTest: string;


  invalidFields: any[] = [];

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
    private eventService: EventService) { }

  ngOnInit() {

    this.parentsData = {
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
      this.currentParentData = this.parentDraft ? this.parentDraft : this.DEFAULT_PARENT_DATA;
    else
      this.currentParentData = this.parentsData.parents[index];

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
    if (!this.validateInputFields())
      return;
    // TODO: change adding or refreshing condition based on parents' id
    if (this.parentsData.parents.filter(it => it.nickname == this.currentParentData.nickname).length > 0)
      this.parentsData.parents.map(it => {
        if (it.nickname == this.currentParentData.nickname)
          it = this.currentParentData;
      });
    else
      this.parentsData.parents.push(this.currentParentData);

    this.currentParentData = null;
    this.isMainPage = true;
  }

  deleteParent(index: number): void {
    this.parentsData.parents.splice(index, 1);
  }

  saveDraft() {
    this.parentDraft = this.currentParentData;
    this.currentParentData = null;
    this.isMainPage = true;
  }

  saveChanges() {

  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];
    if (!this.currentParentData.nickname || this.currentParentData.nickname == "") {
      this.invalidFields.push('name');
      isValid = false;
    }

    if (!this.currentParentData.breed || this.currentParentData.breed == "") {
      this.invalidFields.push('breed');
      isValid = false;
    }

    if (this.currentParentData.gallery.length == 0) {
      this.invalidFields.push('photos');
      isValid = false;
    }

    if (!this.currentParentData.info || this.currentParentData.info == "") {
      this.invalidFields.push('info');
      isValid = false;
    }

    return isValid;
  }

}
