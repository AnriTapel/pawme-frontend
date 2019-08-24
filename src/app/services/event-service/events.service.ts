import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventMap = {};

  public subscribe(key: string, callback: (any) => void) {
      if (this.eventMap[key])
          this.eventMap[key].push(callback);
      else
          this.eventMap[key] = [callback];

      return {
          key: key,
          callback: callback,
          unsubscribe: () => {
              let index = this.eventMap[key].indexOf(callback);
              this.eventMap[key].splice(index, 1);
          }
      }
  }


  public raiseEvent(key: string, param: any) {
      if (this.eventMap[key]) {
          for (let callback of this.eventMap[key])
              callback(param)
      }
  }

}

