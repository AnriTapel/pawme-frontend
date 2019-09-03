import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {

  private message: string = "Test message";
  private isVisible: boolean = true;
  private color: string = "#ff00ff";

  constructor() { }

  getMessage(): string{
    return this.message;
  }

  setMessage(message: string): void{
    this.message = message;
  }

  
  getColor(): string{
    return this.color;
  }

  setColor(color: string): void{
    this.color = color;
  }

  getVisibility(): boolean{
    return this.isVisible;
  }

  setVisibility(isVisible: boolean): void{
    this.isVisible = isVisible;
  }
}
