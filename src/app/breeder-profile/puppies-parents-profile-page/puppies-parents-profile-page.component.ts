import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';

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

  currentPhotos: any;
  currentBodyPart: string;
  currentMedicalTest: string;

  // What page to show - parents page or add/edit current parent
  isMainPage: boolean = true;

  @ViewChild('bodyPartInstance', { static: true }) bodyPartInstance: NgbTypeahead;
  @ViewChild('medicalTestInstance', { static: true }) medicalTestInstance: NgbTypeahead;
  @ViewChild('parentBreedInstance', {static: true}) parentBreedInstance: NgbTypeahead;
  bodyPartFocus$ = new Subject<string>();
  medicalTestFocus$ = new Subject<string>();
  parentBreedFocus$ = new Subject<string>();
  bodyPartClick$ = new Subject<string>();
  medicalTestClick$ = new Subject<string>();
  parentBreedClick$ = new Subject<string>();

  constructor(public appService: AppService) { }

  ngOnInit() {

    this.parentsData = {
      parents: [],
      medicals: []
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

  addParent(){
    
  }

  saveDraft(){

  }

  saveChanges(){

  }

}
