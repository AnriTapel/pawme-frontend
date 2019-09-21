import { Component, OnInit } from '@angular/core';
import { PopupTemplateService } from '../services/popup-service/popup-template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app-service/app.service';
import { BreederControllerService } from '../api/api';
import { DogCardService } from '../services/dog-card-service/dog-card.service';

@Component({
    selector: 'app-breeder-page',
    templateUrl: './breeder-page.component.html',
    styleUrls: ['./breeder-page.component.scss']
})
export class BreederPageComponent implements OnInit {

    isPreviewMode: boolean;
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
        { name: 'Глаза', img: './assets/img/breeder-page/parents-eye.svg', desc: 'Исследование уменьшает шанс передачи глазных заболеваний, таких как дисплазия сетчатки, вывих хрусталика и глаукома, в результате которых питомец начинает хуже видеть, либо теряет зрение полностью' },
        { name: 'Сердце', img: './assets/img/breeder-page/parents-heart.svg', desc: 'Исследование уменьшает шанс передачи сердечных заболеваний, которые передаются по наследству и могут иметь критические последствия для жизни питомца' },
        { name: 'Анализы', img: './assets/img/breeder-page/parents-analysis.svg', desc: 'Анализы проводятся для получения важной информации о состоянии организма родителя' },
        { name: 'Щитовидная железа', img: './assets/img/breeder-page/thyroid.svg', desc: 'Исследование уменьшает шанс передачи гипотиреоза, который может привести к ожирению, потери шерсти и проблемам с кожей' },
        { name: 'Генетика', img: './assets/img/breeder-page/genetics.svg', desc: 'Генетические исследования уменьшают шанс передачи широкого спектра наследственных заболеваний с разным уровнем угрозы для питомца' },
        { name: 'Другое', img: './assets/img/breeder-page/other.svg', desc: 'В зависимости от конкретной породы могут проводиться специфические тесты, направленные на определенные проблемы' }
    ]
    availParentsTests = [];

    timeoutHandlerRight: any;
    timeoutHandlerLeft: any;

    constructor(private popupService: PopupTemplateService, private router: Router, private route: ActivatedRoute, public appService: AppService,
        private breederService: BreederControllerService, public dogCardService: DogCardService) {

        if (this.router.url.indexOf("/preview/") != -1) {
            this.isPreviewMode = true;
            if (this.appService.meData.type != "BREEDER") {
                this.router.navigateByUrl('/login');
                return;
            }
        } else
            this.isPreviewMode = false;

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
    
    subpageStatus(): any {
        let status = {
            generalInfo: this.appService.userData.generalInfo != null,
            puppiesInfo: this.appService.userData.puppiesInfo != null,
            parentsInfo: this.appService.userData.parentsInfo != null,
            about: this.appService.userData.about != null,
            puppies: this.appService.userData.puppies.length > 0
        }
        return status;
    }

    getNurceryName(): string{
        if (this.subpageStatus().generalInfo && this.appService.userData.generalInfo.name)
            return this.appService.userData.generalInfo.name;
        else
            return this.appService.userData.name + " " + this.appService.userData.surname;

    }

    getNameByBreeds(): string {
        let name = "ЗАВОДЧИК ";
        if (!this.appService.userData.generalInfo )
            return name;
        else if (this.appService.userData.generalInfo.mainBreed)
            name += this.appService.userData.generalInfo.mainBreed.name.toUpperCase();
        if (this.appService.userData.generalInfo.extraBreed)
            name += " И " + this.appService.userData.generalInfo.extraBreed.name.toUpperCase();
        return name;
    }

    getParentsTestsList(): void {
        if (!this.appService.userData.parentsInfo)
            return;
        for (let testCat of this.parentsTests) {
            let tests = this.appService.userData.parentsInfo.parentTests.filter(it => it.category == testCat.name);
            if (tests.length == 0)
                continue;
            let name = tests[0].name;
            if (tests.length > 1) {
                for (let i = 1; i < tests.length; i++)
                    name += ", " + tests[i].name.toLowerCase();
            }
            this.availParentsTests.push({ name: name, img: testCat.img, desc: testCat.desc });
        }
    }

    showInfo(property) {
        this.collapse[property] = !this.collapse[property];
    }

    showImageGalley(i: number): void {
        this.popupService.setPopupParams({
            gallery: this.appService.userData.generalInfo.gallery,
            initIndex: i
        });
        this.popupService.setCurrentForm('image-gallery');
        this.popupService.setShowStatus(true);
    }

    getScrollLeftValue(): number {
        if (document.getElementsByClassName('slider')[0].scrollLeft == 0)
            this.mouseupLeft();
        return document.getElementsByClassName('slider')[0].scrollLeft;
    }

    mouseupRight() {
        if (this.timeoutHandlerRight) {
            clearInterval(this.timeoutHandlerRight);
            this.timeoutHandlerRight = null;
        }
    }

    mousedownRight() {
        this.timeoutHandlerRight = setInterval(() => {
            document.getElementsByClassName('slider')[0].scrollLeft += 10;
        }, 50);
    }

    mouseupLeft() {
        if (this.timeoutHandlerLeft) {
            clearInterval(this.timeoutHandlerLeft);
            this.timeoutHandlerLeft = null;
        }
    }

    mousedownLeft() {
        this.timeoutHandlerLeft = setInterval(() => {
            document.getElementsByClassName('slider')[0].scrollLeft -= 10;
        }, 50);
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
        if (!this.appService.userData.puppiesInfo)
            return false;
        return this.appService.userData.puppiesInfo.puppyTests.filter(it => it.id == id).length > 0
    }

    backToProfile(){
        scroll(0, 0);
        this.router.navigateByUrl('/breeder-profile');
    }
}
