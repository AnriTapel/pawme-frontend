import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationBarService {

  private message: string = "Test message";
  private isVisible: boolean = false;
  private color: string = "#ff00ff";

  constructor() { }

  getContext(): any{
    return {
      color: this.color,
      message: this.message
    }
  }

  setContext(message: string, isSuccess: boolean): void {
    this.message = message;
    this.color = isSuccess ? '#46b0ad' : '#eb0000';
  }

  getVisibility(): boolean{
    return this.isVisible;
  }

  setVisibility(isVisible: boolean): void{
    this.isVisible = isVisible;
  }
}
