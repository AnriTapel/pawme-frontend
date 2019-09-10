import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../services/popup-service/popup-template.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app-service/app.service';
import { BreederControllerService } from '../api/api';
import { Breeder } from '../model/models';
import { DogCardService } from '../services/dog-card-service/dog-card.service';

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

    constructor(private popupService: PopupTemplateService, private route: ActivatedRoute, public appService: AppService,
        private breederService: BreederControllerService, public dogCardService: DogCardService) {

        if (!this.appService.userData)
            this.breederService.getBreederUsingGET(parseInt(this.route.snapshot.paramMap.get('id')))
                .subscribe(res => this.appService.userData = res);

    }

    ngOnInit() {
    }

    showInfo(property) {
        this.collapse[property] = !this.collapse[property];
    }

    showBreederMessagePopup(): void {
        this.popupService.setCurrentForm('breeder-message');
        this.popupService.setShowStatus(true);
    }

    showPuppyCard(index: number): void{
        this.dogCardService.setIsPuppy(true);
        this.dogCardService.setDog(this.appService.userData.puppies[index]);
        this.dogCardService.setVisible(true);
    }

    showParentCard(index: number): void{
        this.dogCardService.setIsPuppy(false);
        this.dogCardService.setDog(this.appService.userData.parentsInfo.parents[index]);
        this.dogCardService.setVisible(true);
    }

    getPuppyMedicalStatus(id: number): boolean{
        return this.appService.userData.puppiesInfo.puppyTests.filter(it => it.id == id).length > 0
    }
}
