import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { EventService } from '../../services/event-service/events.service';

@Component({
  selector: 'app-puppies-parents-profile-page',
  templateUrl: './puppies-parents-profile-page.component.html',
  styleUrls: ['./puppies-parents-profile-page.component.scss']
})
export class PuppiesParentsProfilePageComponent implements OnInit {

  // 0 - male, 1 - female
  DEFAULT_PARENT_DATA = {
    name: null,
    isMale: true,
    breed: null,
    info: null,
    photos: []
  }
  parentsData: any;
  currentParentData: any;

  curParentImages: any[] = [];
  currentBodyPart: string;
  currentMedicalTest: string;
  invalidFields: any[] = [];

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
      medicals: [],
      parentDraft: null
    };
  }

  addMedical(): void {
    let curMedical = {
      bodyPart: this.currentBodyPart,
      medicalTest: this.currentMedicalTest
    }
    this.parentsData.medicals.push(curMedical);
    this.currentBodyPart = null;
    this.currentMedicalTest = null;
  }

  deleteMedical(index: number): void {
    this.parentsData.medicals.splice(index, 1);
  }

  showCurrentParentPage(index: number): void {
    if (index == -1)
      this.currentParentData = this.parentsData.parentDraft ? this.parentsData.parentDraft : this.DEFAULT_PARENT_DATA;
    else
      this.currentParentData = this.parentsData.parents[index];

    this.isMainPage = false;
  }

  previewParentImage(): void {
    this.popupService.setPopupParams({ width: 210, height: 180, isRect: true });
    this.popupService.setShowStatus(true);
    this.popupService.setCurrentForm('image-cropper');
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPetImage(body).subscribe((imageData: any) => {
        this.popupService.setShowStatus(false);
        this.currentParentData.photos.push(imageData);
        this.curParentImages.push("http://petman.co/img/" + imageData.preview + ".jpg");
      });
      croppedHandler.unsubscribe();
    });
  }

  deleteParentImage(index: number): void {
    this.curParentImages.splice(index, 1);
    this.currentParentData.photos.splice(index, 1);
  }

  addParent() {
    if (!this.validateInputFields())
      return;
    // TODO: change adding or refreshing condition based on parents' id
    if (this.parentsData.parents.filter(it => it.name == this.currentParentData.name).length > 0)
      this.parentsData.parents = this.parentsData.parents.map(it => {
        if (it.name == this.currentParentData.name)
          it = this.currentParentData;
      });
    else
      this.parentsData.parents.push(this.currentParentData);
    
    this.currentParentData = null;
    this.isMainPage = true;
  }

  deleteParent(index: number): void{
    this.parentsData.parents.splice(index, 1);
  }

  saveDraft() {
    this.parentsData.parentDraft = this.currentParentData;
    this.currentParentData = null;
    this.isMainPage = true;
  }

  saveChanges() {
    
  }

  validateInputFields(): boolean {
    let isValid = true;
    this.invalidFields = [];
    if (!this.currentParentData.name || this.currentParentData.name == "") {
      this.invalidFields.push('name');
      isValid = false;
    }

    if (!this.currentParentData.breed || this.currentParentData.breed == "") {
      this.invalidFields.push('breed');
      isValid = false;
    }

    if (this.currentParentData.photos.length == 0) {
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
