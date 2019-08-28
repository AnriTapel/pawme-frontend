import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupTemplateService {

  private show: boolean = false;
  private currentForm: string;
  private popupParams: any;

  constructor() { }

  getShowStatus(): boolean{
    return this.show;
  }

  setShowStatus(status: boolean): void{
    this.show = status;
    if (status){
      document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    } else
      document.getElementsByTagName("body")[0].style.overflowY = "scroll";
  }

  getCurrentForm(): string{
    return this.currentForm;
  }

  setCurrentForm(formName: string): void{
    this.currentForm = formName;
  }

  setPopupParams(params: any): void{
    this.popupParams = params;
  }

  getPopupParams(): any{
    return this.popupParams;
  }
}
