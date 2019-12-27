import { Component, OnInit } from '@angular/core';

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
  
  showMenu;

  constructor() { }

  ngOnInit() {
  }

}
