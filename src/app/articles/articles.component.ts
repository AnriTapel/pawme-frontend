import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }
  public sendDetailPage(id) {
    this.router.navigate(['/detail', id]);


  }
}
