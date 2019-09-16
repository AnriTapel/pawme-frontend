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

    parentsTests = [
        { name: 'Бедра', img: './assets/img/breeder-page/hip.svg', desc: 'Исследование уменьшает шанс передачи дисплазии бедер. Заболевание больше свойственно крупным породам собак, является причиной потенциальных болей и проблем в работе тазобедренного сустава' },
        { name: 'Локти', img: './assets/img/breeder-page/elbow.svg', desc: 'Исследование уменьшает шанс передачи дисплазии локтей. Заболевание больше свойственно крупным породам собак, является причиной развития артрита и хромоты передних ног' },
        { name: 'Колени', img: './assets/img/breeder-page/knee.svg', desc: 'Исследование уменьшает шанс передачи заболеваний коленных чашечек, которые является причиной развития хромоты и могут вызывать сильную боль' },
        { name: 'Глаза', img: './assets/img/breeder-page/eye.svg', desc: 'Исследование уменьшает шанс передачи глазных заболеваний, таких как дисплазия сетчатки, вывих хрусталика и глаукома, в результате которых питомец начинает хуже видеть, либо теряет зрение полностью' },
        { name: 'Сердце', img: './assets/img/breeder-page/parents-heart.svg', desc: 'Исследование уменьшает шанс передачи сердечных заболеваний, которые передаются по наследству и могут иметь критические последствия для жизни питомца' },
        { name: 'Анализы', img: './assets/img/breeder-page/parents-analysis.svg', desc: 'Анализы проводятся для получения важной информации о состоянии организма родителя' },
        { name: 'Щитовидная железа', img: './assets/img/breeder-page/thyroid.svg', desc: 'Исследование уменьшает шанс передачи гипотиреоза, который может привести к ожирению, потери шерсти и проблемам с кожей' },
        { name: 'Генетика', img: './assets/img/breeder-page/genetics.svg', desc: 'Генетические исследования уменьшают шанс передачи широкого спектра наследственных заболеваний с разным уровнем угрозы для питомца' },
        { name: 'Другое', img: './assets/img/breeder-page/other.svg', desc: 'В зависимости от конкретной породы могут проводиться специфические тесты, направленные на определенные проблемы' }
    ]
    availParentsTests = [];

    constructor(private popupService: PopupTemplateService, private route: ActivatedRoute, public appService: AppService,
        private breederService: BreederControllerService, public dogCardService: DogCardService) {

        if (!this.appService.userData)
            this.breederService.getBreederUsingGET(parseInt(this.route.snapshot.paramMap.get('id')))
                .subscribe(res => {
                    this.appService.userData = res;
                    this.getParentsTestsList();
                });
        else
            this.getParentsTestsList();
    }

    ngOnInit() {
    }

    getNameByBreeds(): string{
        let name = "ЗАВОДЧИК " + this.appService.userData.generalInfo.mainBreed.name.toUpperCase();
        if (this.appService.userData.generalInfo.extraBreed)
            name += " И " + this.appService.userData.generalInfo.extraBreed.name.toUpperCase();
        return name;
    }

    getParentsTestsList(): void {
        let availCats = this.appService.userData.parentsInfo.parentTests.map(it => { return it.category });
        this.availParentsTests = this.parentsTests.filter(it => availCats.includes(it.name));
    }

    showInfo(property) {
        this.collapse[property] = !this.collapse[property];
    }

    showImageGalley(i: number): void{
        this.popupService.setPopupParams({
            gallery: this.appService.userData.generalInfo.gallery,
            initIndex: i
        });
        this.popupService.setCurrentForm('image-gallery');
        this.popupService.setShowStatus(true);
    }

    showBreederMessagePopup(): void {
        this.popupService.setCurrentForm('breeder-message');
        this.popupService.setShowStatus(true);
    }

    showPuppyCard(index: number): void {
        this.dogCardService.setIsPuppy(true);
        this.dogCardService.setDog(this.appService.userData.puppies[index]);
        this.dogCardService.setVisible(true);
    }

    showParentCard(index: number): void {
        this.dogCardService.setIsPuppy(false);
        this.dogCardService.setDog(this.appService.userData.parentsInfo.parents[index]);
        this.dogCardService.setVisible(true);
    }

    getPuppyMedicalStatus(id: number): boolean {
        return this.appService.userData.puppiesInfo.puppyTests.filter(it => it.id == id).length > 0
    }
}
