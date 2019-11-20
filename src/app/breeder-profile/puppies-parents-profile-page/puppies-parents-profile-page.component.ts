import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/services/app-service/app.service';
import { PopupTemplateService } from '../../services/popup-service/popup-template.service';
import { EventService } from '../../services/event-service/events.service';
import { ParentsInfo, ParentTest, Parent } from 'src/app/model/models';
import { BreederControllerService } from 'src/app/api/api';
import { NotificationBarService } from 'src/app/services/nofitication-service/notification-bar.service';
import { BreederProfileService } from 'src/app/services/breeder-profile-service/breeder-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puppies-parents-profile-page',
  templateUrl: './puppies-parents-profile-page.component.html',
  styleUrls: ['./puppies-parents-profile-page.component.scss']
})
export class PuppiesParentsProfilePageComponent implements OnInit {

  DEFAULT_PARENT_DATA: Parent = {
    nickname: null,
    gender: 'MALE',
    breed: null,
    gallery: [],
    info: null,
    id: null
  }
  parentsData: ParentsInfo;
  currentParentData: any;

  currentBodyPart: string;
  currentMedicalTest: string;
  currentBreed: string;
  saveChagesEvent: any;

  parentTests: Object = {
    "Бедра": ["Тест на дисплазию тазобедренного сустава (по стандартам РКФ)"],
    "Локти": ["Тест на дисплазию локтевых суставов (по стандартам РКФ)"],
    "Колени": ["Тест на дисплазию коленных суставов (по стандартам РКФ)"],
    "Глаза": ["Проверка у офтальмолога"],
    "Сердце": ["Обследование у кардиолога"],
    "Анализы": ["Общий анализ крови", "Анализ мочи", "Анализ кала", "Биохимический анализ крови"],
    "Генетика": ['Прогрессирующая атрофия сетчатки папильонов и фаленов pap-PRA', 'Семейная нефропатия английских кокер спаниелей (FN)', 'Болезнь Фон Виллебранда 2 типа (vWDII)', 'Прогрессирующая атрофия сетчатки CRD-SWD / PRA-cord2', 'Прогрессирующая атрофия сетчатки PRA-CNGA1', 'Глобоидно-клеточная лейкодистрофия (Болезнь Краббе)', 'Дефицит пируваткиназы (PKdef) ', 'Миотубулярная миопатия (MTM1, XL-MTM) ', 'Недостаточность фактора VII (FVIID)', 'Тяжелый комбинированный иммунодефицит, сцепленный с Х-хромосомой, Бассет хаунд (XSCID)', 'Ахроматопсия (дневная слепота, ACHM) ', 'Гемофилия B (дефицит фактора IX, FIXD) ', 'Макротромбоцитопения (MTC) ', 'Мозжечковая абиотрофия (NCCD) ', 'Генетика окраса, Локус H (арлекин)',
      'Паспорт генетической идентификации (ДНК паспорт)', 'Дегенеративная миелопатия. Экзон 1 (DM Ex1) ', 'Дегенеративная миелопатия. Два экзона (DM Ex1,Ex2) ', 'Наследственная миотония (шнауцер)', 'Краниомандибулярная остеопатия (CMO)', 'Недостаточность фосфофруктокиназы ', 'Центроядерная миопатия ', 'Аномалия глаз колли (CEA от Collie Eye Anomaly)', 'Прогрессирующая атрофия сетчатки (PRA) собак', 'Циклическая нейтропения ', 'Цистинурия ', 'Первичный вывих хрусталика (PLL)', 'Гликогеноз IIIa типа', 'Дегенеративная миелопатия. Экзон 2 (DM Ex2)', 'Мукополисахаридоз третьего Б типа ', 'Гиперурикозурия (Hyperuricosuria, HUU)', 'Мозжечковая атаксия 4А типа', 'Болезнь Виллибранда (von Willebrand disease, vWD)',
      'Прогрессирующая атрофия сетчатки (PRA) голден-ретриверов (GR-PRA1+prcd-PRA)', 'Наследственная катаракта (HSF4)', 'Длина шерсти, мутация p.A193V (c.578C>T)', 'Синдром эпизодического падения (EFS)', 'Синдром сухого глаза и курчавошерстности (CKCSID)', 'Наследственный гиперкератоз подушечек лап (HFH)', 'Дилатационная кардиомиопатия (DCM)', 'Ихтиоз голден ретриверов (ICT-A)', 'Злокачественная гипертермия (MH) ', 'Мышечная дистрофия кавалер кинг чарльз спаниэлей (DMD-CKCS)', 'Мультифокальная ретинопатия (CMR1)', 'Врожденный гипотиреоз с зобом Terier (CHG)', 'Длина шерсти на морде(furnishings)', 'Сертификат Зооген', 'Наследственный носовой паракератоз ретриверов (HNPK)', 'Наследственный энцефалит мопсов (NME)',
      'Прогрессирующая атрофия сетчатки голден ретриверов GR-PRA2', 'Прогрессирующая атрофия сетчатки PRA-crd1', 'Прогрессирующая атрофия сетчатки PRA-crd2 ', 'Голость китайских хохлатых собак', 'Нарколепсия ', 'Дилатационная кардиомиопатия', 'Куриная слепота бриаров (CSNB)', 'Ювенильный паралич гортани/Полинейропатия (JLPP)', 'Синдром Фанкони басенджи (FBS)', 'L-2-гидроксиглутаровая ацидурия / L2HGA', 'Поликистоз почек бультерьеров (BTPKD)', 'Ранняя прогрессирующая полинейропатия маламутов (AMPN)', 'Куцехвостость', 'Дварфизм (гипофизарная недостаточность)', 'Нейроаксональная дистрофия (NAD)', 'Первичная цилиарная дискинезия (PCD)', 'Ювенильная миоклоническая эпилепсия Родезийских риджбеков (JME)', 'Поздняя мозжечковая атаксия (LOA)',
      'Спиноцеребеллярная атаксия с миокимией и/или судорогами (SCA)', 'Летальный акродерматит бультерьров (LAD)', 'Ювенильная идиопатическая эпилепсия (BFJE)', 'Дерматомиозит (DMS) ', 'Болезнь фон Виллебранда III-го типа (vWD type III) ', 'Ганглиозидоз 1 типа (GM1) ', 'Лихорадка шарпеев (SPAID)', 'Нейрональный цероидный липофусциноз 1-го типа (NCL1) ', 'Нейрональный цероидный липофусциноз 2-го типа (NCL2) ', 'Нефропатия с потерей белка (PLN) ', 'Синдром акральной матуляции (AMS)'],
    "Щитовидная железа": ["Анализ щитовидной железы"],
    "Другое": ["Тест на гипоплазию трахеи", "Ультразвуковое исследование почек"]
  };

  testsCategories: Array<string> = Object.keys(this.parentTests);

  // What page to show - parents page or add/edit current parent
  isMainPage: boolean = true;

  @ViewChild('bodyPartInstance', { static: true }) bodyPartInstance: NgbTypeahead;
  @ViewChild('medicalTestInstance', { static: true }) medicalTestInstance: NgbTypeahead;
  @ViewChild('parentBreedInstance', { static: true }) parentBreedInstance: NgbTypeahead;
  bodyPartFocus$ = new Subject<string>();
  medicalTestFocus$ = new Subject<string>();
  parentBreedFocus$ = new Subject<string>();
  bodyPartClick$ = new Subject<string>();
  medicalTestClick$ = new Subject<string>();
  parentBreedClick$ = new Subject<string>();

  constructor(public appService: AppService, private popupService: PopupTemplateService, private router: Router,
    private eventService: EventService, private breederService: BreederControllerService,
    private notificationService: NotificationBarService, public profileService: BreederProfileService) { }

  ngOnInit() {
    this.parentsData = this.appService.userData.parentsInfo ? <ParentsInfo>this.appService.userData.parentsInfo : {
      parents: [],
      parentTests: [],
      parentDraft: null
    };
    this.saveChagesEvent = this.eventService.subscribe('save-changes-after-dialog', (forPreview) => {
      if (this.currentParentData && !this.currentParentData.id)
        this.saveDraft();
      else
        this.saveChanges(forPreview);
    });
  }

  ngOnDestroy(): void {
    this.saveChagesEvent.unsubscribe();
  }

  addMedical(): void {
    this.profileService.invalidFields = [];
    if (!this.currentBodyPart || this.currentBodyPart == "")
      this.profileService.invalidFields.push('bodyParts');
    if (!this.currentMedicalTest || this.currentMedicalTest == "")
      this.profileService.invalidFields.push('tests');
    if (this.profileService.invalidFields.includes('tests') || this.profileService.invalidFields.includes('bodyParts'))
      return;

    let curMedical: ParentTest = {
      category: this.currentBodyPart,
      name: this.currentMedicalTest
    }
    this.parentsData.parentTests.push(curMedical);
    this.currentBodyPart = null;
    this.currentMedicalTest = null;
    this.saveChanges(false);
  }

  onBodyPartClick(event: any) {
    this.profileService.inputValueChanged('bodyParts');
    this.bodyPartClick$.next(event.target.value);
  }

  onTestsClick(event: any) {
    this.profileService.inputValueChanged('tests');
    this.medicalTestClick$.next(event.target.value);
  }

  deleteMedical(index: number): void {
    this.parentsData.parentTests.splice(index, 1);
    this.saveChanges(false);
  }

  showCurrentParentPage(index: number): void {
    if (index == -1) {
      this.currentParentData = this.parentsData.parentDraft ? this.parentsData.parentDraft
        : JSON.parse(JSON.stringify(this.DEFAULT_PARENT_DATA));
      this.currentParentData.id = null;
    } else
      this.currentParentData = this.parentsData.parents[index];

    this.currentBreed = this.currentParentData.breed ? this.currentParentData.breed.name : null;
    this.isMainPage = false;
    scroll(0, 0);
  }

  backToMainPage(): void {
    this.currentParentData = null;
    this.isMainPage = true;
  }

  previewParentImage(index: number): void {
    this.popupService.setPopupParams({
      width: 210, height: 180, isRect: true,
      imageUrl: index > -1 ? "/img/" + this.currentParentData.gallery[index].main + ".jpg" : null
    });
    this.popupService.setCurrentForm('image-cropper');
    this.popupService.setShowStatus(true);
    let croppedHandler = this.eventService.subscribe('image-cropped', (data) => {
      let body = this.appService.getImageDataForUpload(data);
      this.appService.uploadPetImage(body).subscribe((imageData: any) => {
        this.profileService.inputValueChanged('photos');
        this.popupService.setShowStatus(false);
        if (index == -1)
          this.currentParentData.gallery.push(imageData);
        else
          this.currentParentData.gallery[index] = imageData;
      }, (err) => {
        if (err.status == 415) {
          this.popupService.setShowStatus(false);
          this.notificationService.setContext('Не удалось сконвертировать фотографию. Выберите другую.', false);
          this.notificationService.setVisibility(true);
        }
      });
      croppedHandler.unsubscribe();
    });
    let cropperClosedHandler = this.eventService.subscribe('image-cropper-closed', () => {
      croppedHandler.unsubscribe();
      cropperClosedHandler.unsubscribe();
    });
  }

  deleteParentImage(index: number): void {
    this.currentParentData.gallery.splice(index, 1);
    this.profileService.dataChangesSaved = false;
  }

  addParent(forPreview: boolean) {
    if (!this.validateFields())
      return;
    this.currentParentData.breed = this.appService.breeds.filter(it => it.name == this.currentBreed)[0] || { name: this.currentBreed };

    if (!this.currentParentData.id) {
      this.parentsData.parents.push(this.currentParentData);
      this.parentsData.parentDraft = null;
    }
    this.saveChanges(forPreview);
  }

  deleteParent(index: number): void {
    this.parentsData.parents.splice(index, 1);
    this.saveChanges(false);
  }

  saveDraft() {
    if (this.currentBreed && this.currentBreed != "")
      this.currentParentData.breed = this.appService.breeds.filter(it => it.name == this.currentBreed)[0] || { name: this.currentBreed };
    this.parentsData.parentDraft = JSON.parse(JSON.stringify(this.currentParentData));
    this.breederService.setParentsInfoUsingPUT(this.appService.userData.id, this.parentsData).subscribe(() => {
      this.appService.userData.parentsInfo = this.parentsData;
      this.profileService.dataChangesSaved = true;
      this.currentParentData = null;
      this.isMainPage = true;
      this.notificationService.setContext('Черновик успешно сохранен', true);
      this.notificationService.setVisibility(true);
      scroll(0, 0);
      this.profileService.updateProfileFullness();
    }, (err) => {
      if (err.status == 403)
        this.router.navigateByUrl('/login');
      this.notificationService.setContext('Черновик не были сохранены, попробуйте еще раз', false);
      this.notificationService.setVisibility(true);
      scroll(0, 0);
    }
    );
  }

  saveChanges(forPreview: boolean) {
    if (!this.validateFields())
      return;
    this.breederService.setParentsInfoUsingPUT(this.appService.userData.id, this.parentsData).subscribe(() => {
      if (this.appService.userData.parentsInfo && this.appService.userData.parentsInfo.parents.length == 2) {
        //@ts-ignore
        ym(55779592, 'reachGoal', 'ParentsSave');
        //@ts-ignore
        gtag('event', 'ParentsSave');
        //@ts-ignore
        Intercom('trackEvent', 'ParentsSave');
      }
      this.breederService.getBreederUsingGET(this.appService.userData.id).subscribe((res) => {
        this.profileService.dataChangesSaved = true;
        this.appService.userData = res;
        this.parentsData = res.parentsInfo;
        this.currentParentData = null;
        this.currentBreed = null;
        this.isMainPage = true;
        this.profileService.updateProfileFullness();
        this.notificationService.setContext('Изменения успешно сохранены', true);
        this.notificationService.setVisibility(true);
        scroll(0, 0);
        if (forPreview)
          window.open('/breeder/' + this.appService.userData.id, '_blank');
      });
    }, (err) => {
      if (err.status == 423)
        this.notificationService.setContext('К сожалению, ваш аккаунт заблокирован. Help@petman.co', false);
      if (err.status == 403)
        this.router.navigateByUrl('/login');
      else
        this.notificationService.setContext('Изменения не были сохранены, попробуйте еще раз', false);
      this.notificationService.setVisibility(true);
      scroll(0, 0);
    });
  }

  validateFields(): boolean {
    if (!this.currentParentData)
      return true;

    let isValid = true;
    this.profileService.invalidFields = [];
    if (!this.currentParentData.nickname || this.currentParentData.nickname == "" || this.currentParentData.nickname.length > 40) {
      this.profileService.invalidFields.push('name');
      isValid = false;
    }

    if (!this.currentBreed || this.currentBreed == "" || this.appService.breeds.filter(it => it.name == this.currentBreed).length == 0) {
      this.profileService.invalidFields.push('breed');
      isValid = false;
    }

    if (this.currentParentData.gallery.length == 0) {
      this.profileService.invalidFields.push('photos');
      isValid = false;
    }

    if (!this.currentParentData.info || this.currentParentData.info == "" || this.currentParentData.info.length > 1024) {
      this.profileService.invalidFields.push('info');
      isValid = false;
    }

    return isValid;
  }

}