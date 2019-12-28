import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared-services/shared.service';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) {
    this.sharedService.headerType.emit('2')
  }

  ngOnDestroy(): void {
    this.sharedService.headerType.emit('1')
  }
  ngOnInit() {
  }
  public sendDetailPage(id) {
    this.router.navigate(['/detail', id]);


  }
}
