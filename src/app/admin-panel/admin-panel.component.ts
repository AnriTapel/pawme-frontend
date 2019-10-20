import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminControllerService } from '../api/api';
import { AppService } from '../services/app-service/app.service';
import { HttpClient } from '@angular/common/http';
import { NotificationBarService } from '../services/nofitication-service/notification-bar.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  activeSection: string = 'breeders';
  breeders: any[] = [];
  messages: any[] = [];

  constructor(private router: Router, private adminService: AdminControllerService, private appService: AppService,
    private http: HttpClient, private notificationService: NotificationBarService) {
  }

  ngOnInit() {
    this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = res);
    this.adminService.listMessagesUsingGET().subscribe(res => this.messages = res);
  }

  logout(): void {
    this.http.get('/api/logout').subscribe(
      data => {
        this.appService.meData = { type: 'ANONYMOUS' };
        this.appService.userData = null;
        this.router.navigateByUrl('/breeder-landing');
      });
  }

  displayBreederProfileFill(profileFill: number): string {
    let str = "";
    for (let i = 0; i < profileFill; i++)
      str += '○ ';

    return str.substr(0, str.length - 1);
  }

  switchSection(section: string): void {
    if (section == this.activeSection)
      return;
    this.activeSection = section;
  }

  openBreederPage(id: number): void {
    window.open('https://petman.co/breeder/' + id, '_blank');
  }

  changeBreederStatus(id: number, event: any): void {
    this.adminService.updateStatusUsingPUT(id, event.target.value).subscribe(() => {
      this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = res);
    },(err) => {
      this.notificationService.setContext('Произошла ошибка, попробуйте еще раз', false);
      this.notificationService.setVisibility(true);
      this.adminService.listBreedersUsingGET().subscribe(res => this.breeders = res);
    })
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

    return (table, fileName) => {
      if (!table.nodeType)
        table = document.getElementById(table).cloneNode(true);
      if (table.getAttribute('id') == 'breeders-table'){
        for (let i = 1; i < table.childElementCount; i++){
          let value = table.children[i].lastElementChild.firstElementChild.selectedOptions[0].value;
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