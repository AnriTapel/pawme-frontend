import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';
import { SearchTerms } from '../../model/searchTerms';
import { SearchMeta } from '../../model/searchMeta';
import { PetSelectionRequest } from '../../model/petSelectionRequest';
import { BreederSearchEntry } from '../../model/breederSearchEntry';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { JsonDataService } from 'src/app/services/json-data/json-data.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';








@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  constructor(
    public appService: AppService,
    private searchControllerService: SearchControllerService,
    private route: ActivatedRoute,
    private breederService: BreederControllerService,
    private router: Router,
    private jsonDataService: JsonDataService,
    private popupService: PopupTemplateService
  ) { }

  searchData: SearchTerms = {
    breed: null,
    cities: null,
    range: null
  };

  SearchMetaData: SearchMeta = {
    breeds: null,
    cities: null
  };

  sendEmaillData: PetSelectionRequest = {
    breed: null,
    city: null,
    createDate: null,
    email: null,
    id: null
  };

  getSearchData: any = null;

  getMetaSearchData: SearchMeta = null;
  lenghtSearchData: number;
  showTableData: boolean = false;
  p: any = 1;
  userFilter: any;
  invalidFields: any[] = [];
  showBox: boolean = false;
  state: boolean;
  breed: string[];

  breedList;
  citiesList;
  rangeList;

  selectedBreedChar;

  showMenu;
  citiesById;
  isOpen: boolean = false;
  range = "+10км";
  city: string[];

  ngOnInit() {
    this.citiesById = this.appService.citiesById;

    this.route.queryParamMap.subscribe(params => {
      this.breed = params.getAll('breed');

      /* city multiple part  */
      //@ts-ignore
      //this.searchData.cities = params.getAll('cities');

      if (params.getAll('cities').length) {
        //@ts-ignore
        this.city = parseInt(params.getAll('cities'));
      } else {
        this.searchData.cities = [];
      }
       //@ts-ignore
       if (params.getAll('range').length) {
        //@ts-ignore
        this.range = params.getAll('range');
        this.range = '+' + this.range + 'km';
       }
     
      if (params.getAll('currentPage').length) {
        this.p = +params.getAll('currentPage');
      } else {
        this.p = 1;
      }
    });

    if (this.breed.length !== 0) {
      this.searchData.breed = Number(this.breed);
    }


    this.searchControllerService.getSearchMetaUsingGET()
      .subscribe((res) => {
        this.getMetaSearchData = <SearchMeta>res;
        this.breedList = this.appService.breeds;
        this.breedList.forEach((item) => {
          item.disabled = true;
          this.getMetaSearchData['breeds'].forEach(element => {
            if (+item.id === +element) {
              item.disabled = false;
            }
          });
        });

        let replacedBreedList = [];

        this.breedList.forEach((item) => {
          if (!item.disabled) {
            replacedBreedList.push(item);
          }
        });
        this.breedList.forEach((item) => {
          if (item.disabled) {
            replacedBreedList.push(item);
          }
        });

        this.breedList = replacedBreedList;

        let replaceCitiesList = [];

        this.citiesList = [];
        
        this.appService.citiess.forEach((item, index) => {
          this.citiesList.push(
            {
              name: item.name,
              id:item.id,
              disabled: true
            }
          )
          this.getMetaSearchData['cities'].forEach(element => {
            if (item.id === element) {
              this.citiesList[index].disabled = false;
            }
          });
        });

        this.rangeList = [];
        this.appService.range.forEach((item, index) => {
          this.rangeList.push(
            {
              name: item,
              disabled: false
            }
          )
        });
       
        this.citiesList.forEach((item) => {
          if (!item.disabled) {
            replaceCitiesList.push(item);
          }
        });
        this.citiesList.forEach((item) => {
          if (item.disabled) {
            replaceCitiesList.push(item);
          }
        });

        this.citiesList = replaceCitiesList;
      
        if (this.searchData.breed) {
          this.breedList.forEach(element => {
            if (element.id === this.searchData.breed) {
              this.getBreedCharacterization(element);
            }
          });
        } else {
          this.selectedBreedChar = null;
        }

      });

      if (this.range) {
        this.searchData.range = parseInt(this.range.match(/\d+/)[0]);
      }
      if (this.city) {
        this.searchData.cities = [];
        this.searchData.cities.push(Number(this.city));
      }
      else {
        this.searchData.cities = [];
      }

    this.searchControllerService.findUsingPOST(this.searchData)
      .subscribe((res) => {
        this.lenghtSearchData = res.length;
        this.getSearchData = <any>res;
        for (let el in this.getSearchData) {
          this.getSearchData[el].city= this.citiesById[this.getSearchData[el].cityId];
        }
        if (this.searchData.breed == null) {
          for (let key in this.getSearchData) {
            this.appService.breeds.forEach(val => {
              if (this.getSearchData[key].breed0 == val.id) {
                this.getSearchData[key].breedValue0 = val.name;
              }
              if (this.getSearchData[key].breed1 == val.id) {
                this.getSearchData[key].breedValue1 = val.name;
              }
              if (this.getSearchData[key].breed2 == val.id) {
                this.getSearchData[key].breedValue2 = val.name;
              }
            });
          }
        }
      });

  }

  @HostListener('window:scroll', ['$event'])
  getScreenSize(event) {

    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 400) {
      this.state = true;
    } else {
      this.state = false;
    }
  }
  public changeInput(event) {
    if (event !=undefined && event != '') {   
      this.appService.citiess.forEach(element => {
      if (element.id == event.id) {
        //this.showRangePopup();
        if (localStorage.getItem('showRangeModal') !='value') {
          this.showRangePopup();
        }
      }
    });
    }

    if (this.range) {
      this.searchData.range = parseInt(this.range.match(/\d+/)[0]);
    }

    if (this.city) {
      this.searchData.cities = [];
      this.searchData.cities.push(Number(this.city));
    }
     else {
      this.searchData.cities = [];
    }
    this.searchControllerService.findUsingPOST(this.searchData)
      .subscribe((res) => {
        this.lenghtSearchData = res.length;
        this.getSearchData = <any>res;
        for (let el in this.getSearchData) {
          this.getSearchData[el].city= this.citiesById[this.getSearchData[el].cityId];
        }
        this.getSearchData.forEach(element => {
          if (element.city === this.searchData.breed) {
            this.getBreedCharacterization(element);
          }
        });
        if (this.searchData.breed == null) {
          for (let key in this.getSearchData) {
            this.appService.breeds.forEach(val => {
              if (this.getSearchData[key].breed0 == val.id) {
                this.getSearchData[key].breedValue0 = val.name;
              }
              if (this.getSearchData[key].breed1 == val.id) {
                this.getSearchData[key].breedValue1 = val.name;
              }
              if (this.getSearchData[key].breed2 == val.id) {
                this.getSearchData[key].breedValue2 = val.name;
              }
            });
          }
        }
      }, (err) => {
        if (err.status == 404)
          console.log('error', err)
      });

    this.updateParam();

    if (this.searchData.breed) {
      this.breedList.forEach(element => {
        if (element.id === this.searchData.breed) {
          this.getBreedCharacterization(element);
        }
      });
    } else {
      this.selectedBreedChar = null;
    }
  }
  public updateSearch($event) {
    if ($event == '') {
      this.showTableData = false;
    } else {
      this.showTableData = true;
    }

  }
  fieldEdited(field: string): void {
    this.invalidFields = this.invalidFields.filter(it => it != field);
  }
  private validateFields(): boolean {
    let isValid = true;
    this.invalidFields = [];

    if (!this.sendEmaillData.email || this.sendEmaillData.email == " "
      || !this.appService.validateEmailInput(this.sendEmaillData.email)) {
      isValid = false;
      this.invalidFields.push("email");
    }
    return isValid;
  }
  public sendEmail() {
    //@ts-ignore
    ym(55779592, 'reachGoal', 'MatchRequest');
    //@ts-ignore
    gtag('event', 'MatchRequest');
    //@ts-ignore
    Intercom('trackEvent', 'MatchRequest');
    if (!this.validateFields())
      return;

    this.sendEmaillData.email = this.sendEmaillData.email.toLowerCase();
    this.sendEmaillData.breed = this.searchData.breed;
    if (this.searchData.cities && this.searchData.cities !== null) {
      this.sendEmaillData.city = this.searchData.cities.join(", ");
    }
    this.searchControllerService.savePetSelectionRequestUsingPOST(this.sendEmaillData)
      .subscribe((res) => {
        this.showBox = true;
      }, (err) => {
        if (err.status == 404)
          console.log('error', err)
      });

  }
  scrollTop() {
    window.scrollTo(0, 200)
  }
  getBreedCharacterization(selectedBreed) {
    let haveSuccess = false;
    this.jsonDataService.getBreedCharacterization().subscribe(res => {

      let arr: any = res;
      arr.forEach(element => {
        if (element.breed.trim().toLowerCase() === selectedBreed.name.trim().toLowerCase()) {
          this.selectedBreedChar = element;
          haveSuccess = true;
        }
      });

      if (!haveSuccess)
        this.selectedBreedChar = null;

    });
  }

  updateParam() {
    const queryParams = {};

    if (this.searchData.breed)
      queryParams['breed'] = this.searchData.breed;
      /* city multiple part  */
    // if (this.searchData.cities && this.searchData.cities.length)
    //   queryParams['cities'] = this.searchData.cities;

    if (this.city) {
      queryParams['cities'] = Number(this.city);
    }
      queryParams['range'] = this.searchData.range;
      
      queryParams['currentPage'] = this.p;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams
      });
  }

  getTopBreeder(ev) {
    if (ev.name === "Топ заводчиков") {
      this.searchData.breed = null;
      this.searchData.cities = null;
      this.changeInput(event);
    }
  }

  showAboutMorePopup(): void {
    this.hideRangePopup();
    this.popupService.setCurrentForm('about-more');
    this.popupService.setPopupParams({'width': 'about-more-modal'});
    this.popupService.setShowStatus(true);
  }

  showRangePopup(): void {
    localStorage.setItem('showRangeModal', 'value');
    this.isOpen = !this.isOpen; 
  }

  hideRangePopup(): void {
    this.isOpen = false; 
  }

}
