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

  showDialog(messageList: string[], onSuccessFunction: Function, onCancelFunction: Function): Observable<void> {
    let alertObj: AlertMessage = { 
      messageList: messageList,
      button1Text: 'Да', button1Function: onSuccessFunction,
      button2Text: 'Нет', button2Function: onCancelFunction
    };
    this.alertStatus.next(alertObj);
    return;
  }
}
