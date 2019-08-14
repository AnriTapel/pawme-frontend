import { Injectable } from '@angular/core';
import { Subject, Observable, merge } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // Data of logged-in entity
  userData: any;

  // Dog entity parameters
  availCities = ["Москва", "Пермь", "Саратов", "Екатеринбург", "Волгоград", "Самара", "Ростов-на-Дону", "Санкт-Петербург", "Владивосток"];
  availBreeds = ["Шпиц", "Далматинец", "Бульдог", "Овчарка", "Лайка", "Хаски", "Доберман", "Ротвейлер"];
  availBodyParts: string[] = ["Голова", "Туловище", "Уши", "Передние лапы", "Задние лапы", "То самое", "Кости", "Хвост"];
  availMedicalTests: string[] = ["МРТ", "ЭКГ", "ФСБ", "ПТУ", "ПВА", "МГУ", "ЛГБТ", "ГИБДД", "ТНТ"];

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
