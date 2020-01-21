import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminControllerService } from '../api/api';
import { AppService } from '../services/app-service/app.service';
import { HttpClient } from '@angular/common/http';
import { NotificationBarService } from '../services/nofitication-service/notification-bar.service';
import { AdminInfo, BreederForAdmin, MessageToBreeder, Admin, Breed } from '../model/models';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  activeSection: string = 'breeders';
  breeders: BreederForAdmin[] = null;
  messages: MessageToBreeder[] = null;
  admins: Admin[] = null;

  ADMIN_INFO_OBJECT : AdminInfo = {
    name: null,
    surname: null,
    email: null,
    password: null,
    phone: null,
    roles: []
  } 
  
  newAdmin: AdminInfo;
  newBreed = { name: null, nameGen: null };
  changeBreed= { name: null, nameGen: null, id: null };

  roles: any[] = [
    { status: false, value: "ADD_ADMIN", name: "Добавление админов" },
    { status: false, value: "PROFILE_EDIT", name: "Редактирование профилей" },
    { status: false, value: "VIEW_EMAIL", name: "Отображение поля Email" },
    { status: false, value: "DOWNLOAD_DB", name: "Выгрузка базы заводчиков" },
    { status: false, value: "CHANGE_STATUS", name: "Изменение статусов" },
    { status: false, value: "VIEW_MESSAGES", name: "Просмотр сообщений" }
  ];

  invalidFields: string[] = [];
  breeds: Breed = null;
  enableEdit = false;
  enableEditIndex = null;

  constructor(private router: Router, private adminService: AdminControllerService, public appService: AppService,
    private http: HttpClient, private notificationService: NotificationBarService) {
  }

  ngOnInit() {
    this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = this.initEntityOperations(res));
    this.breeds = this.appService.breeds;
  }

  logout(): void {
    this.http.get('/api/logout').subscribe(
      data => {
        this.appService.meData = { type: 'ANONYMOUS' };
        this.appService.userData = null;
        this.router.navigateByUrl('/breeder-landing');
      });
  }

  initEntityOperations(res: any): any {
    for (let breeder of res) {
      breeder.createDate = new Date(breeder.createDate);
    }
    let sortRes = res.sort((a, b) => {
      return b.createDate.getTime() - a.createDate.getTime();
    })
    return sortRes.filter(it => it.status != 'DELETED');
  }

  getCreateDateAsString(date: Date): string {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  }

  displayBreederProfileFill(profileFill: number): string {
    let str = "";
    for (let i = 0; i < profileFill; i++)
      str += '○ ';

    return str.substr(0, str.length - 1);
  }

  addBreed(): void {
    this.adminService.addBreedUsingPOST(this.newBreed).subscribe(
      () => {
        this.notificationService.setContext("Порода успешно добавлена", true);
        this.notificationService.setVisibility(true);
        this.newBreed = { name: null, nameGen: null };
        location.reload();
      }, () => {
        this.notificationService.setContext("Не удалось добавить породу", false);
        this.notificationService.setVisibility(true);
      }
    )
  }

  editBreed(event, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
   
  }
  saveBreed(breed:Breed) {
      if (breed.name != null && breed.nameGen!= null && breed.id != null) {
        this.adminService.editBreedUsingPUT(breed, breed.id).subscribe(
          (res) => {
            this.notificationService.setContext("Порода успешно обновлена", true);
            this.notificationService.setVisibility(true);
            location.reload();
          }
        )
      } else {
        this.notificationService.setContext("Порода не обновлена", false);
        this.notificationService.setVisibility(true);
      }
  }

  deleteBreed(id: number) {
    this.adminService.deleteBreedUsingDELETE(id).subscribe(
      () => {
        this.notificationService.setContext("Порода успешно удалена", true);
        this.notificationService.setVisibility(true);
        location.reload();
      }
    )
  }

  switchSection(section: string): void {
    if (section == this.activeSection)
      return;
    this.activeSection = section;

    this.initBlockData();
  }

  private initBlockData(): void {
    if (this.activeSection == 'customers' && !this.messages)
      this.adminService.listMessagesUsingGET().subscribe(res => this.messages = res);
    else if (this.activeSection == 'add-admins')
      this.newAdmin = JSON.parse(JSON.stringify(this.ADMIN_INFO_OBJECT));
    else if (this.activeSection == 'admin-list' && !this.admins)
      this.adminService.listAdminsUsingGET().subscribe(res => this.admins = this.initEntityOperations(res));
  }

  openBreederPage(id: number): void {
    window.open(window.location.origin + "/breeder/" + id, '_blank');
  }

  changeBreederStatus(id: number, event: any): void {
    if (event.target.value == "PERMANENT_DELETE")
      this.adminService.deleteBreederUsingDELETE(id).subscribe(() => {
        this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = this.initEntityOperations(res));
      }, () => {
        this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = this.initEntityOperations(res));
      })
    else
      this.adminService.updateStatusUsingPUT(id, event.target.value).subscribe(() => {
        this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = this.initEntityOperations(res));
      }, () => {
        this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
        this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = this.initEntityOperations(res));
      });
  }

  changeBreederRating(id: number, event: any) {
      this.adminService.setCustomRatingUsingPUT(id, event.target.value).subscribe((res => {
        this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = this.initEntityOperations(res));
      }));
  }

  createNewAdmin(): void {
    if (!this.validateNewAdmin())
      return;
    this.newAdmin.roles = this.roles.map(it => {
      if (it.status) return it.value
    });

    this.adminService.createAdminUsingPOST(this.newAdmin).subscribe(
      () => {
        this.adminService.listBreedersUsingGET().subscribe(res => this.admins = this.initEntityOperations(res));
        this.newAdmin = JSON.parse(JSON.stringify(this.ADMIN_INFO_OBJECT));
      }, () => {
        this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
        this.notificationService.setVisibility(true);
      }
    )
  }

  private validateNewAdmin() {
    this.invalidFields = [];
    let isValid = true;
    if (!this.newAdmin.name || this.newAdmin.name == "" || this.newAdmin.name.length < 2 || this.newAdmin.name.length > 30) {
      isValid = false;
      this.invalidFields.push("name");
    }

    if (!this.newAdmin.surname || this.newAdmin.surname == ""
      || this.newAdmin.surname.length < 2 || this.newAdmin.surname.length > 30) {
      isValid = false;
      this.invalidFields.push("lastname");
    }

    if (!this.newAdmin.phone || this.newAdmin.phone == ""
      || this.newAdmin.phone.length != 17) {

      if (this.newAdmin.phone.length == 18)
        this.newAdmin.phone = this.newAdmin.phone.substr(0, 17);
      else {
        isValid = false;
        this.invalidFields.push("phone");
      }
    }

    if (!this.newAdmin.email || this.newAdmin.email == ""
      || !this.appService.validateEmailInput(this.newAdmin.email)) {
      isValid = false;
      this.invalidFields.push("email");
    }

    if (!this.newAdmin.password || this.newAdmin.password == ""
      || this.newAdmin.password.length < 2 || this.newAdmin.password.length > 30) {
      isValid = false;
      this.invalidFields.push("password");
    }
    return isValid;
  }

  tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; })
      }
      , downloadURI = function (uri, name) {
        var link = document.createElement("a");
        link.download = name + '.xls';
        link.href = uri;
        link.click();
      }

    return (table, fileName, data?) => {
      if (!table.nodeType)
        table = document.getElementById(table).cloneNode(true);
      if (data) {
        for (let i = 1; i < table.childElementCount; i++) {
          let value = data.filter(it => it.id == parseInt(table.children[i].firstElementChild.innerText))[0].status;
          table.children[i].lastElementChild.innerHTML = null;
          table.children[i].lastElementChild.innerText = value;
        }
      }
      var ctx = { worksheet: 'Worksheet', table: table.innerHTML }
      var resuri = uri + base64(format(template, ctx))
      downloadURI(resuri, fileName);
    }
  })();
}