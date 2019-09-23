import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertMessage } from './alert-message';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public visible: boolean;
  public alertStatus: BehaviorSubject<AlertMessage> = new BehaviorSubject<AlertMessage>({ visible: false, messageList: null });

  showAlert(messageList: string[]): void {
    let alertObj: AlertMessage = { messageList: messageList };
    this.alertStatus.next(alertObj);
  }

  showSuccess(messageList: string[]): void {
    let alertObj: AlertMessage = { messageList: messageList, button1Text: 'Ок' };
    this.alertStatus.next(alertObj);
  }

  showError(messageList: string[], onSuccessFunction: Function): void {
    let alertObj: AlertMessage = { messageList: messageList, button1Text: 'Ок', button1Function: onSuccessFunction };
    this.alertStatus.next(alertObj);
  }

  showDialog(titleText: string, titleClass: string, messageList: string[], button1Text: string, button1Class: string, button2Text: string, 
      button2Class: string, onSuccessFunction: Function, onCancelFunction: Function): Observable<void> {
    let alertObj: AlertMessage = { 
      messageList: messageList,
      titleText: titleText,
      titleClass: titleClass,
      button1Text: button1Text, button1Class: button1Class, button1Function: onSuccessFunction,
      button2Text: button2Text,  button2Class: button2Class, button2Function: onCancelFunction
    };
    this.alertStatus.next(alertObj);
    return;
  }
}
