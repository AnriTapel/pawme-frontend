import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminControllerService } from '../api/api';
import { AppService } from '../services/app-service/app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  activeSection: string = 'breeders';
  breeders: any[] = [];
  messages: any[] = [];

  constructor(private router: Router, private adminService: AdminControllerService, private appService: AppService, private http: HttpClient) {
    /*if (this.appService.meData.type != "ADMIN") {
      this.router.navigateByUrl('/breeder-landing');
      return;
    }*/
  }

  ngOnInit() {
  }

  logout(): void {
    this.http.get('/api/logout').subscribe(
      data => {
        this.appService.meData = { type: 'ANONYMOUS' };
        this.appService.userData = null;
        this.router.navigateByUrl('/breeder-landing');
      });
  }

  switchSection(section: string): void{
    if (section == this.activeSection)
      return;
    this.activeSection = section;
  }

  downloadBreedersList(): void{

  }

  downloadMessagesList(): void{

  }

  openBreederPage(id: number): void{
    window.open('https://petman.co/breeder/' + id, '_blank');
  }

  changeBreederStatus(id: number, event: any): void{

  }
}