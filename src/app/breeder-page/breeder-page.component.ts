import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupTemplateService } from '../services/popup-service/popup-template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app-service/app.service';
import { BreederControllerService } from '../api/api';
import { DogCardService } from '../services/dog-card-service/dog-card.service';
import { Meta } from '@angular/platform-browser';
import { SharedService } from '../services/shared-services/shared.service';
import { NotificationBarService } from '../services/nofitication-service/notification-bar.service';
import { ChatService } from '../services/chat-service/chat.service';

@Component({
    selector: 'app-breeder-page',
    templateUrl: './breeder-page.component.html',
    styleUrls: ['./breeder-page.component.scss']
})
export class BreederPageComponent implements OnInit, OnDestroy {

    galleryLoopArray = Array(100).fill(1);
    isPreviewMode: boolean;
    collapse = {
        contract: false,
        warranty: false,
        buyPuppy: false,
        gifts: false

    };

    showMenu;

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

    constructor(
        private popupService: PopupTemplateService,
        private router: Router,
        private route: ActivatedRoute,
        public appService: AppService,
        private breederService: BreederControllerService,
        public dogCardService: DogCardService,
        private meta: Meta,
        private sharedService: SharedService,
        private notificationService: NotificationBarService,
        private chatService: ChatService

    ) {
        this.sharedService.headerType.emit('hidden')

        if (this.router.url.indexOf("/preview/") != -1) {
            this.isPreviewMode = true;
            if (this.appService.meData.type != "BREEDER") {
                this.router.navigateByUrl('/login');
                return;
            }
        } else
            this.isPreviewMode = false;

        // console.log("this.route.snapshot.paramMap.get('id')", this.route.snapshot.paramMap.get('id'));
        //console.log("parseInt ----this.route.snapshot.paramMap.get('id')", parseInt(this.route.snapshot.paramMap.get('id')));
        // this.breederService.getBreederUsingGET(parseInt(this.route.snapshot.paramMap.get('id')))
        this.breederService.getBreederUsingGET(this.route.snapshot.paramMap.get('id'))
            .subscribe((res) => {
                this.appService.userData = res;
                if (this.appService.userData.generalInfo && this.appService.userData.generalInfo.alias) {
                    this.router.navigateByUrl('/breeder/'+ this.appService.userData.generalInfo.alias)
                }
                
                this.getParentsTestsList();
                this.setMetaTags(res);
            }, (err) => {
                if (err.status == 404)
                    this.router.navigateByUrl('/404');
            });
    }

    ngOnDestroy(): void {
        this.sharedService.headerType.emit('1')
    }


    ngOnInit() {
        this.appService.userData = null;
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

    setMetaTags(res: any): void {
        this.meta.addTags([
            { property: 'og:type', content: 'website' },
            { name: 'og:type', content: 'website' },
            { property: 'og:url', content: window.location.origin + "/breeder/" + res.id },
            { name: 'og:url', content: window.location.origin + "/breeder/" + res.id },
            { property: 'title', content: this.getNurceryName() + " - " + this.getNameByBreeds() },
            { name: 'title', content: this.getNurceryName() + " - " + this.getNameByBreeds() },
            { property: 'og:title', content: this.getNurceryName() + " - " + this.getNameByBreeds() },
            { name: 'og:title', content: this.getNurceryName() + " - " + this.getNameByBreeds() },
            { name: 'twitter:title', content: this.getNurceryName() + " - " + this.getNameByBreeds() },
            { property: 'og:description', content: 'Узнай больше о питомнике ' + this.getNurceryName() + '. Фото щенков и родителей, медицина и другое.' },
            { name: 'og:description', content: 'Узнай больше о питомнике ' + this.getNurceryName() + '. Фото щенков и родителей, медицина и другое.' },
            { name: 'twitter:description', content: 'Узнай больше о питомнике ' + this.getNurceryName() + '. Фото щенков и родителей, медицина и другое.' },
            { property: 'og:site_name', content: 'Petman' },
            { name: 'og:site_name', content: 'Petman' },
            { name: 'twitter:card', content: 'summary_large_image' }
        ]);

        if (res.generalInfo && res.generalInfo.gallery.length > 0)
            this.meta.addTags([
                { property: 'og:image', content: window.location.origin + '/img/' + res.generalInfo.gallery[0].preview + '.jpg' },
                { name: 'og:image', content: window.location.origin + '/img/' + res.generalInfo.gallery[0].preview + '.jpg' },
                { name: 'twitter:image', content: window.location.origin + '/img/' + res.generalInfo.gallery[0].preview + '.jpg' }
            ]);
    }

    getNurceryName(): string {
        if (this.subpageStatus().generalInfo && this.appService.userData.generalInfo.name)
            return this.appService.userData.generalInfo.name;
        else
            return this.appService.userData.name + " " + this.appService.userData.surname;

    }

    getNameByBreeds(): string {
        let name = "ЗАВОДЧИК ";
        if (!this.appService.userData.generalInfo)
            return name;
        else if (this.appService.userData.generalInfo.mainBreed)
            name += this.appService.userData.generalInfo.mainBreed.nameGen.toUpperCase();
        if (this.appService.userData.generalInfo.extraBreed)
            name += " И " + this.appService.userData.generalInfo.extraBreed.nameGen.toUpperCase();
        return name;
    }

    getPuppySaleAge(): string {
        if (!this.subpageStatus().puppiesInfo || !this.appService.userData.puppiesInfo.age)
            return '1 недели';

        if (this.appService.userData.puppiesInfo.age % 10 == 1 && this.appService.userData.puppiesInfo.age != 11)
            return this.appService.userData.puppiesInfo.age + ' недели';
        else
            return this.appService.userData.puppiesInfo.age + ' недель';
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

    openInstagramPage(nickname: string): void {
        let url = 'https://instagram.com/' + (nickname[0] == '@' ? nickname.substr(1) : nickname);
        window.open(url, '_blank');
    }

    // For Facebook & Web-site
    openPageByUrl(url: string): void {
        if (!url.startsWith('http'))
            url = 'http://' + url;
        window.open(url, '_blank');
    }

    showInfo(property) {
        this.collapse[property] = !this.collapse[property];
    }

    showImageGalley(i: number, source: any): void {
        this.popupService.setPopupParams({
            gallery: source,
            initIndex: i
        });
        this.popupService.setCurrentForm('image-gallery');
        this.popupService.setShowStatus(true);
    }

    getTooltipPlacement(): string {
        return window.innerWidth < 770 ? 'bottom-right' : 'bottom';
    }

    getScrollLeftValue(): number {
        return document.getElementsByClassName('slider')[0].scrollLeft;
    }

    scrollLeft(): void {
        //@ts-ignore
        $('.slider').animate({ scrollLeft: '-=360' }, 250);
    }

    scrollRight(): void {
        //@ts-ignore
        $('.slider').animate({ scrollLeft: '+=360' }, 250);
    }

    showBreederMessagePopup(): void {
        // this.popupService.setCurrentForm('breeder-message');
        // this.popupService.setShowStatus(true);
        let params = { breederId: this.route.snapshot.paramMap.get('id') }
        if (this.appService.meData.type == 'BREEDER') {
            this.notificationService.setContext('Пожалуйста, выйдите из аккаунта заводчика', false);
            this.notificationService.setVisibility(true);
        }
        else if (this.appService.meData.type == 'CUSTOMER') {
            this.popupService.setPopupParams(params);
            this.popupService.setCurrentForm('first-message');
            this.popupService.setShowStatus(true);

        } else {
            this.popupService.setPopupParams(params);
            this.popupService.setCurrentForm('client-chat');
            this.popupService.setShowStatus(true);
        }
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

    backToProfile() {
        scroll(0, 0);
        this.router.navigateByUrl('/breeder-profile');
    }
}
