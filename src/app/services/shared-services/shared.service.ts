import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  headerType = new EventEmitter;
  headerTypeLogin = new EventEmitter;
  updateNotifMessage = new EventEmitter;

  constructor() { }
  
}
