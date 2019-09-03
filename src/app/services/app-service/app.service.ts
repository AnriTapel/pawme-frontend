import { Injectable } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PuppyTest } from 'src/app/model/puppyTest';
import { BreederControllerService } from 'src/app/api/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Current user info
  userData: any = null;
  meData: any = null;

  // Dog entity parameters
  cities: any;
  breeds: any;
  puppyTests: Array<PuppyTest>;

  constructor(private http: HttpClient, private breederService: BreederControllerService) {
  }

  initApplication() {
    return new Promise<void>((resolve, reject) => {
      console.log("AppInitService.init() called");
      this.breederService.meUsingGET().subscribe(res => {
        this.meData = res;

        
        this.http.get('/api/dict').subscribe(dict => {
          console.log("Init finished");
          this.breeds = dict['breeds'];
          this.cities = dict['cities'];
          this.puppyTests = dict['puppyTests'];
          
          if (this.meData.type == 'BREEDER')
            this.breederService.getBreederUsingGET(this.meData.id).subscribe(res => {
              this.userData = res;
              resolve();
            });
          else
            resolve();
        });


      });
    });
  }

  public uploadAvatarImage(body: FormData) {
    return this.http.post('/api/upload/avatar', body);
  }

  public uploadNurceryGalleryImage(body: FormData) {
    return this.http.post('/api/upload/gallery', body);
  }

  public uploadPersonalImage(body: FormData) {
    return this.http.post('/api/upload/personal', body);
  }

  public uploadPetImage(body: FormData) {
    return this.http.post('api/upload/pet', body);
  }

  fieldAutocomplete(searchArray: any[], focus$: Subject<string>, click$: Subject<string>, instance: NgbTypeahead): (text$: Observable<string>) => Observable<any[]> {
    return (text$: Observable<string>) => {
      let values = searchArray;
      if (searchArray[0] && searchArray[0].name)
        values = searchArray.map(it => { return it.name });
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = click$.pipe(filter(() => instance.isPopupOpen()));
      const inputFocus$ = focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? values
          : values.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    }
  }

  toggleDropdownTextInput(id: string, event: any): void{
    document.getElementById(id).focus(event.target.value);
  }

  validateEmailInput(email: string): boolean {
    let re = /^[A-Za-z]+([\.-]?[A-Za-z]+)*@[A-Za-z]+([\.-]?[A-Za-z]+)*(\.[A-Za-z]{2,3})+$/;
    return re.test(email);
  }

  getImageDataForUpload(data: any): FormData {
    const body = new FormData();
    body.append('image', data.inputFile, data.inputFile.name || "main_image.jpg");
    body.append('rect',
      (Math.floor(data.props.position.x - (data.props.width / 2 / data.props.scale)) + "," +
        (Math.floor(data.props.position.y - data.props.height / 2 / data.props.scale)) + "," +
        Math.floor(data.props.width / data.props.scale) + "," +
        Math.floor(data.props.height / data.props.scale)
      ));
    return body;
  }
}
