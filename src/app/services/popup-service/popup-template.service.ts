import { Injectable } from '@angular/core';
import { AppService } from '../app-service/app.service';

@Injectable({
  providedIn: 'root'
})
export class PopupTemplateService {

  private show: boolean = false;
  private currentForm: string;
  private popupParams: any;

  constructor(private appService: AppService) { }

  getShowStatus(): boolean{
    return this.show;
  }

  setShowStatus(status: boolean): void{
    this.show = status;
    if (status)
      this.appService.disableBodyScrolling();
    else
      this.appService.enableBodyScrolling();
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
