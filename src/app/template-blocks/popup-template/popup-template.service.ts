import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupTemplateService {

  private show: boolean = false;
  private currentForm: string;

  constructor() { }

  getShowStatus(): boolean{
    return this.show;
  }

  setShowStatus(status: boolean): void{
    this.show = status;
  }

  getCurrentForm(): string{
    return this.currentForm;
  }

  setCurrentForm(formName: string): void{
    this.currentForm = formName;
  }
}
