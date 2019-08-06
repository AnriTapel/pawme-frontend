import { Injectable } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  fieldAutocomplite(searchArray: string[], focus$: Subject<string>, click$: Subject<string>, instance: NgbTypeahead): (text$: Observable<string>) => Observable<any[]> {
    return (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = click$.pipe(filter(() => instance.isPopupOpen()));
      const inputFocus$ = focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? searchArray
          : searchArray.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
    }

  }
}
