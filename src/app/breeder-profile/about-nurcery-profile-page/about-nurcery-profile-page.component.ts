import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-about-nurcery-profile-page',
  templateUrl: './about-nurcery-profile-page.component.html',
  styleUrls: ['./about-nurcery-profile-page.component.scss']
})
export class AboutNurceryProfilePageComponent implements OnInit {

  nurceryData: any;
  isAdditionalBreed: boolean = false;

  availCities = ["Москва", "Пермь", "Саратов", "Екатеринбург", "Волгоград", "Самара", "Ростов-на-Дону", "Санкт-Петербург", "Владивосток"];
  availBreeds = ["Шпиц", "Далматинец", "Бульдог", "Овчарка", "Лайка", "Хаски", "Доберман", "Ротвейлер"];
  
  @ViewChild('cityInstance', {static: true}) cityInstance: NgbTypeahead;
  @ViewChild('mainBreedInstance', {static: true}) mainBreedInstance: NgbTypeahead;
  @ViewChild('addBreedInstance', {static: true}) addBreedInstance: NgbTypeahead;
  cityFocus$ = new Subject<string>();
  cityClick$ = new Subject<string>();
  mainBreedFocus$ = new Subject<string>();
  mainBreedClick$ = new Subject<string>();
  addBreedFocus$ = new Subject<string>();
  addBreedClick$ = new Subject<string>();

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.nurceryData = {
      nurceryName: null,
      nurceryLocation: null,
      nurceryMainBreed: null,
      nurceryAdditionalBreed: null,
      aboutNurcery: null,
      nurceryProfileImage: null,
      nurceryGalleryImage: null,
      nurceryGallery: [],
      nurceryInstagram: null,
      nurcerySite: null,
      nurceryFacebook: null

    };
  }

  saveChanges(){
    console.log(this.nurceryData);
  }
}
