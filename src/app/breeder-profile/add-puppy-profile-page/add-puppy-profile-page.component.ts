import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';

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
  currentPhotos: any;
  currentPuppyData: any;

  birthdayModel: NgbDateStruct = {day: null, month: null, year: null};

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

  constructor(public appService: AppService) { }

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

  addPuppy(): void{

  }

}
