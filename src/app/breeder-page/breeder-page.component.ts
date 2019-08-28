import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    ngOnInit() {
    }

    showInfo(property) {
        this.collapse[property] = !this.collapse[property];
    }

}
