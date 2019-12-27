import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent implements OnInit {

  menuItems = [
    {
      name: 'Топ заводчиков',
      url: '/search-page'
    },
    {
      name: 'База знаний',
      url: '/articles'
    },
    {
      name: 'О нас',
      url: '/about-us'
    }
  ];

  @Input() showMenu: boolean;
  @Input() state: boolean;

  constructor() { }

  ngOnInit() {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 400) {
      this.state = true;
    } else {
      this.state = false;
    }
  }

}
