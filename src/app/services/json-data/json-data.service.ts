import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      //console.log(data);
    });
    this.getClientJSON().subscribe(data => {
      //console.log(data);
    });
  }

  // public getJSON(): Observable<any> {
  //   return this.http.get("./assets/articales.json");
  // }
  public getJSON(): Observable<any> {
    return this.http.get("./assets/articales.v2.json");
  }
  
  public getClientJSON(): Observable<any> {
    return this.http.get("./assets/client.json");
  }

  getBreedCharacterization() {
    return this.http.get('assets/breed-characterization.json');
  }

}
