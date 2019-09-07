import {Component, OnInit} from '@angular/core';
import { PopupTemplateService } from '../services/popup-service/popup-template.service';

@Component({
    selector: 'app-breeder-page',
    templateUrl: './breeder-page.component.html',
    styleUrls: ['./breeder-page.component.scss']
})
export class BreederPageComponent implements OnInit {

    collapse = {
        contract: false,
        warranty: false,
        buyPuppy: false,
        gifts: false

    };

    constructor(private popupService: PopupTemplateService) {
    }

    ngOnInit() {
    }

    showInfo(property) {
        this.collapse[property] = !this.collapse[property];
    }

    showBreederMessagePopup(): void{
        this.popupService.setCurrentForm('breeder-message');
        this.popupService.setShowStatus(true);
    }
}
