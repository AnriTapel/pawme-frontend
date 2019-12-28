import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  headerType = new EventEmitter;

  constructor() { }
  
}
