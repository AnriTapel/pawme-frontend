import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service/alert.service';
import { AlertMessage } from 'src/app/services/alert-service/alert-message';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    messageList: string[];

    //TODO: array of models 'Button'
    titleText: string;
    titleClass: string;
    button1Text: string;
    button1Class: string;
    button2Text: string;
    button2Class: string;
    button1Function: Function;
    button2Function: Function;

    constructor(public alertService: AlertService) {
        document.addEventListener("keyup", (evt) => { if (!evt || evt.code != "Enter") return; this.onButton1Click() });
    }

    ngOnInit() {
        this.alertService.alertStatus.subscribe((value: AlertMessage) => {
            this.alertService.visible = value.visible == null || value.visible == undefined ? true : value.visible;
            this.titleText = value.titleText;
            this.titleClass = value.titleClass;
            this.messageList = value.messageList;
            this.button1Text = value.button1Text ? value.button1Text : "Ок";
            this.button1Class = value.button1Class;
            this.button2Text = value.button2Text;
            this.button2Class = value.button2Class;
            this.button1Function = value.button1Function;
            this.button2Function = value.button2Function;
        })
    }

    onButton1Click(): void {
        if (!this.alertService.visible)
            return;
        this.alertService.visible = false;
        if (this.button1Function) {
            this.button1Function();
        }
    }

    onButton2Click(): void {
        this.alertService.visible = false;
        if (this.button2Function) {
            this.button2Function();
        }
    }

}
