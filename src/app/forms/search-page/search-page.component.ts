import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';
import { SearchTerms } from '../../model/searchTerms';
import { SearchMeta } from '../../model/searchMeta';
import { PetSelectionRequest } from '../../model/petSelectionRequest';
import { BreederSearchEntry } from '../../model/breederSearchEntry';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { JsonDataService } from 'src/app/services/json-data/json-data.service';








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
    private jsonDataService: JsonDataService
  ) { }

  searchData: SearchTerms = {
    breed: null,
    cities: null
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

  getMetaSearchData: SearchMeta = null;//BreederSearchEntry = null;
  lenghtSearchData: number;
  showTableData: boolean = false;
  p: any;
  userFilter: any;
  invalidFields: any[] = [];
  showBox: boolean = false;
  state: boolean;
  breed: string[];

  breedList;
  citiesList;

  selectedBreedChar;

  showMenu;


  ngOnInit() {
    
    this.route.queryParamMap.subscribe(params => {
      this.breed = params.getAll('breed');
      this.searchData.cities = params.getAll('cities');
    });

    if (this.breed.length !== 0) {
      this.searchData.breed = Number(this.breed);
    };

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
        this.appService.cities.forEach((item, index) => {
          this.citiesList.push(
            {
              name: item,
              disabled: true
            }
          )
          this.getMetaSearchData['cities'].forEach(element => {
            if (item === element) {
              this.citiesList[index].disabled = false;
            }
          });
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
    this.searchControllerService.findUsingPOST(this.searchData)
      .subscribe((res) => {
        this.lenghtSearchData = res.length;
        this.getSearchData = <any>res;
        if (this.searchData.breed == null) {
          console.log('this.getSearchData', this.getSearchData);
          for (let key in this.getSearchData) {
            this.appService.breeds.forEach(val => {
              if (this.getSearchData[key].breed0 == val.id) {
                this.getSearchData[key].breed0 = val.name;
              } 
              if (this.getSearchData[key].breed1 == val.id) {
                this.getSearchData[key].breed1 = val.name;
              } 
              if (this.getSearchData[key].breed2 == val.id) {
                this.getSearchData[key].breed2 = val.name;
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
    this.searchControllerService.findUsingPOST(this.searchData)
      .subscribe((res) => {
        this.lenghtSearchData = res.length;
        this.getSearchData = <any>res;
        if (this.searchData.breed === null) {
          for (let key in this.getSearchData) {
            this.appService.breeds.forEach(val => {
              if (this.getSearchData[key].breed0 == val.id) {
                this.getSearchData[key].breed = val.name;
              } 
            });
          }
        }
      }, (err) => {
        if (err.status == 404)
          console.log('error', err)
      });

    const queryParams = {};

    if (this.searchData.breed)
      queryParams['breed'] = this.searchData.breed;
    if (this.searchData.cities)
      queryParams['cities'] = this.searchData.cities;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams
      });

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
}
