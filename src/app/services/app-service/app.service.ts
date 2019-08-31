import { Injectable } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PuppyTest } from 'src/app/model/puppyTest';
import { BreederControllerService } from 'src/app/api/api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Data of logged-in entity
  userData: any;

  // Dog entity parameters
  cities: any;
  breeds: any;
  puppyTests: Array<PuppyTest>;

  constructor(private http: HttpClient, private breederService: BreederControllerService) {
    http.get('/api/dict').subscribe((res) => {
      this.breeds = res['breeds'];
      this.cities = res['cities'];
      this.puppyTests = res['puppyTests'];
    });
  }

  authenticateBreeder(credentials: any) {
    let body = new FormData();
    body.append('username', credentials.username);
    body.append('password', credentials.password);
    
    return this.http.post('/api/login', body, {responseType: 'text'}).pipe(
      tap(
        data => this.breederService.getBreederUsingGET(JSON.parse(data).id).subscribe(res => {
          this.userData = res;
        }), error => {}
      )
    );
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
        values = searchArray.map(it => {return it.name});
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = click$.pipe(filter(() => instance.isPopupOpen()));
      const inputFocus$ = focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? values
          : values.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    }
  }

  validateEmailInput(email: string): boolean {
    let re = /^[A-Za-z]+([\.-]?[A-Za-z]+)*@[A-Za-z]+([\.-]?[A-Za-z]+)*(\.[A-Za-z]{2,3})+$/;
    return re.test(email);
  }

  public getImageDataForUpload(data: any): FormData {
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
