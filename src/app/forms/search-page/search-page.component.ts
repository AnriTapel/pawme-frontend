import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/services/app-service/app.service';
import { SearchControllerService, BreederControllerService } from 'src/app/api/api';
import { SearchTerms } from '../../model/searchTerms';
import { SearchMeta } from '../../model/searchMeta';
import { PetSelectionRequest } from '../../model/petSelectionRequest';
import { BreederSearchEntry } from '../../model/breederSearchEntry';
import { ActivatedRoute } from '@angular/router';








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
    private breederService: BreederControllerService
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
  userFilter: any ;
  invalidFields: any[] = [];
  showBox: boolean = false;
  state: boolean;
  breed: string[];

  breedList;
  citiesList;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => this.breed = params.getAll('breed'));
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

      }, (err) => {
        if (err.status == 404)
          console.log('error', err);
      });

    this.searchControllerService.findUsingPOST(this.searchData)
      .subscribe((res) => {
        this.lenghtSearchData = res.length;
        this.getSearchData = <any>res;
        console.log(this.getSearchData, 'this.getSearchData');
        
      }, (err) => {
        if (err.status == 404)
          console.log('error', err)
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
    //console.log("Scroll Event", window.pageYOffset );
  }
  public changeInput(event) {
    this.searchControllerService.findUsingPOST(this.searchData)
      .subscribe((res) => {
        this.lenghtSearchData = res.length;
        this.getSearchData = <any>res;    
      }, (err) => {
        if (err.status == 404)
          console.log('error', err)
      });
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
  scrollTop(){
    window.scrollTo(0, 200)
  }
}
